// src/controllers/categoryController.js
const Category = require('../models/Category');

// Create a new category (with optional image upload)
exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, order } = req.body;
    const image = req.file?.path;  // multer + Cloudinary set req.file.path
    const cat = await Category.create({ name, slug, order, image });
    res.status(201).json(cat);
  } catch (err) {
    next(err);
  }
};

// Get all categories, sorted by `order`
exports.getAllCategories = async (req, res, next) => {
  try {
    const cats = await Category.find().sort('order');
    res.json(cats);
  } catch (err) {
    next(err);
  }
};

// Get single category by ID
exports.getCategoryById = async (req, res, next) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (err) {
    next(err);
  }
};

// Update category (and replace image if uploaded)
exports.updateCategory = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.path;
    const cat = await Category.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json(cat);
  } catch (err) {
    next(err);
  }
};

// Delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

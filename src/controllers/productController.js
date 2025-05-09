// src/controllers/productController.js
const Product = require('../models/Product');

// Create a new product (with multiple image uploads)
exports.createProduct = async (req, res, next) => {
  try {
    const data = { ...req.body };
    // req.files is an array of uploaded files
    data.images = req.files.map(f => f.path);
    const prod = await Product.create(data);
    res.status(201).json(prod);
  } catch (err) {
    next(err);
  }
};

// Get products with optional filters: ?category=ID, ?featured=true, ?mustTry=true
exports.getProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured === 'true') filter.isFeatured = true;
    if (req.query.mustTry === 'true') filter.isMustTry = true;
    const prods = await Product.find(filter).populate('category');
    res.json(prods);
  } catch (err) {
    next(err);
  }
};

// Get single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id).populate('category');
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.json(prod);
  } catch (err) {
    next(err);
  }
};

// Update product (and replace images if uploaded)
exports.updateProduct = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.files?.length) {
      updates.images = req.files.map(f => f.path);
    }
    const prod = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.json(prod);
  } catch (err) {
    next(err);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

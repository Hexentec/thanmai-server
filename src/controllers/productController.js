// src/controllers/productController.js

const Product = require('../models/Product');

// Helper to safely parse floats
const toNum = (v, fallback = 0) => {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
};

exports.createProduct = async (req, res, next) => {
  try {
    // 1. Base fields
    const data = {
      name:        req.body.name,
      slug:        req.body.slug,
      description: req.body.description,
      ingredients: req.body.ingredients,
      isFeatured:  req.body.isFeatured === 'true',
      isMustTry:   req.body.isMustTry === 'true',
      category:    req.body.category,
    };

    // 2. Variants (JSON string → array of objects)
    if (req.body.variants) {
      const raw = JSON.parse(req.body.variants);
      data.variants = raw.map(v => ({
        weight:           v.weight,
        price:            toNum(v.price),
        discountedPrice:  toNum(v.discountedPrice),
        discountPercent:  toNum(v.discountPercent),
      }));
    }

    // 3. Images (from multer upload.array('images'))
    if (req.files?.length) {
      data.images = req.files.map(f => f.path);
    }

    // 4. Save
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    // Optionally you could add filters here (e.g. ?featured=true)
    const prods = await Product.find()
      .populate('category', 'name slug');
    res.json(prods);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.id)
      .populate('category', 'name slug');
    if (!prod) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(prod);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    // 1. Build updates
    const updates = {
      name:        req.body.name,
      slug:        req.body.slug,
      description: req.body.description,
      ingredients: req.body.ingredients,
      isFeatured:  req.body.isFeatured === 'true',
      isMustTry:   req.body.isMustTry === 'true',
      category:    req.body.category,
    };

    // 2. Parse variants if provided
    if (req.body.variants) {
      const raw = JSON.parse(req.body.variants);
      updates.variants = raw.map(v => ({
        weight:           v.weight,
        price:            toNum(v.price),
        discountedPrice:  toNum(v.discountedPrice),
        discountPercent:  toNum(v.discountPercent),
      }));
    }

    // 3. Replace images if new files uploaded
    if (req.files?.length) {
      updates.images = req.files.map(f => f.path);
    }

    // 4. Perform update
    const prod = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!prod) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(prod);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

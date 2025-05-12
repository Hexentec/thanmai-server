// src/models/Product.js
const mongoose = require('mongoose');

// Sub‐schema for each variant
const variantSchema = new mongoose.Schema({
  weight:           { type: String, required: true },
  price:            { type: Number, required: true },
  discountedPrice:  { type: Number, default: 0 },
  discountPercent:  { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  slug:            { type: String, required: true, unique: true },
  description:     { type: String },
  ingredients:     { type: String },
  images:          [String],
  variants:        [variantSchema],
  isFeatured:      { type: Boolean, default: false },
  isMustTry:       { type: Boolean, default: false },
  category:        { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

// src/models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variant:  String,        // e.g. "500g"
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:   [cartItemSchema],
  updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);

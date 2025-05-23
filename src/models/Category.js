const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:  { type: String, required: true, unique: true },
  slug:  { type: String, required: true, unique: true },
  image: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
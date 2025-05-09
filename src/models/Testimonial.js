const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  authorName:   { type: String, required: true },
  authorPhoto:  String,
  quote:        { type: String, required: true },
  rating:       { type: Number, min: 1, max: 5, required: true },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
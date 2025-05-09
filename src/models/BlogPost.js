const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  excerpt:      String,
  content:      String,
  slug:         { type: String, required: true, unique: true },
  coverImage:   String,
  publishedAt:  { type: Date, default: Date.now },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
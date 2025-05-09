const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  weight: String,
  pricesByCountry: { type: Map, of: Number }
});

const productSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  slug:            { type: String, required: true, unique: true },
  category:        { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description:     String,
  ingredients:     String,
  images:          [String],
  variants:        [variantSchema],
  isFeatured:      { type: Boolean, default: false },
  isMustTry:       { type: Boolean, default: false },
  bundleDiscountPct: Number,
  ratingsAvg:       Number,
  orderCount24h:    Number,
  viewCountNow:     Number,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
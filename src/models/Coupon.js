// src/models/Coupon.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code:          { type: String, required: true, unique: true },
  discountPct:   { type: Number, required: true },      // e.g. 10 for 10%
  maxUses:       { type: Number, default: 0 },           // 0 = unlimited
  usesCount:     { type: Number, default: 0 },
  validFrom:     Date,
  validUntil:    Date,
  minOrderValue: Number,                                 // only apply if total >= this
});

module.exports = mongoose.model('Coupon', couponSchema);

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variant:  String,
  quantity: Number,
  price:    Number,
});

const orderSchema = new mongoose.Schema({

  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:        [itemSchema],
  subtotal:        Number,
  shippingFee:     Number,
  total:           Number,
  country:         String,
  razorpayOrderId: String,
  paymentStatus:   { type: String, enum: ['created','paid','failed'], default: 'created' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
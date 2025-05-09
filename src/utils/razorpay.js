const Razorpay = require('razorpay');
const razor = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = (amount, currency = 'INR') => {
  return razor.orders.create({ amount, currency });
};

exports.verifySignature = (payload, signature) => {
  const crypto = require('crypto');
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest('hex');
  return expected === signature;
};

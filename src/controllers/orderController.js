// src/controllers/orderController.js
const Order            = require('../models/Order');
const { createOrder, verifySignature } = require('../utils/razorpay');

// Create Razorpay order + persist Order
exports.create = async (req, res, next) => {
  try {
    const { items, subtotal, shippingFee, total, country } = req.body;
    const razorOrder = await createOrder(total * 100);
    const order = await Order.create({
      user: req.user.id,
      items, subtotal, shippingFee, total, country,
      razorpayOrderId: razorOrder.id
    });
    res.status(201).json({ order, razorpayOrder });
  } catch (err) {
    next(err);
  }
};

// Razorpay webhook
exports.webhook = async (req, res, next) => {
  try {
    const sig   = req.headers['x-razorpay-signature'];
    const valid = verifySignature(req.rawBody, sig);
    if (!valid) return res.status(400).end('invalid signature');

    const evt = req.body.event;
    const payment = req.body.payload.payment.entity;
    if (evt === 'payment.authorized') {
      await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        { paymentStatus: 'paid' }
      );
    }
    res.json({ status: 'ok' });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name images');
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // e.g. 'shipped'
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    next(err);
  }
};

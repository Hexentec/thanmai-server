// src/controllers/couponController.js
const Coupon = require('../models/Coupon');

exports.createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
};

exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort('-validUntil');
    res.json(coupons);
  } catch (err) {
    next(err);
  }
};

exports.getCouponById = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    res.json(coupon);
  } catch (err) {
    next(err);
  }
};

exports.updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    res.json(coupon);
  } catch (err) {
    next(err);
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

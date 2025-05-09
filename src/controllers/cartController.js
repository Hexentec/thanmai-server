// src/controllers/cartController.js
const Cart   = require('../models/Cart');
const Coupon = require('../models/Coupon');

exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.addOrUpdateItem = async (req, res, next) => {
  try {
    const { productId, variant, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

    const idx = cart.items.findIndex(
      (i) => i.product.toString() === productId && i.variant === variant
    );
    if (idx > -1) {
      cart.items[idx].quantity = quantity;
    } else {
      cart.items.push({ product: productId, variant, quantity });
    }
    cart.updated = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const { productId, variant } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (i) => !(i.product.toString() === productId && i.variant === variant)
    );
    cart.updated = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [], updated: Date.now() }
    );
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.applyCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal } = req.body;
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ message: 'Invalid coupon' });

    const now = new Date();
    if (coupon.validFrom && coupon.validFrom > now) {
      return res.status(400).json({ message: 'Coupon not active yet' });
    }
    if (coupon.validUntil && coupon.validUntil < now) {
      return res.status(400).json({ message: 'Coupon expired' });
    }
    if (coupon.maxUses && coupon.usesCount >= coupon.maxUses) {
      return res.status(400).json({ message: 'Coupon usage limit reached' });
    }
    if (coupon.minOrderValue && cartTotal < coupon.minOrderValue) {
      return res.status(400).json({ message: `Minimum order ₹${coupon.minOrderValue}` });
    }

    // increment use count
    coupon.usesCount += 1;
    await coupon.save();

    const discount = (cartTotal * coupon.discountPct) / 100;
    res.json({ discount, newTotal: cartTotal - discount });
  } catch (err) {
    next(err);
  }
};

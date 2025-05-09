// src/routes/cartRoutes.js
const express = require('express');
const {
  getCart,
  addOrUpdateItem,
  removeItem,
  clearCart,
  applyCoupon
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.get('/',               getCart);
router.post('/',              addOrUpdateItem);
router.delete('/',            clearCart);
router.post('/remove',        removeItem);
router.post('/apply-coupon',  applyCoupon);

module.exports = router;

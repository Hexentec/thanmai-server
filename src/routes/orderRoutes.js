// src/routes/orderRoutes.js
const express = require('express');
const {
  create,
  webhook,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Place order (customer)
router.post('/', protect, create);

// Razorpay webhook (raw body)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  webhook
);

// Admin: view & manage all orders
router.get('/',       protect, admin, getAllOrders);
router.get('/:id',    protect,             getOrderById);
router.patch('/:id',  protect, admin, updateOrderStatus);

module.exports = router;

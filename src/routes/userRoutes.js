// src/routes/userRoutes.js
const express = require('express');
const {
  getProfile,
  updateProfile
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Customer profile (must be authenticated)
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;

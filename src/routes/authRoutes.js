// src/routes/authRoutes.js
const express = require('express');
const {
  adminLogin,
  signup,
  login
} = require('../controllers/authController');
const router = express.Router();

// Admin login
router.post('/admin-login', adminLogin);

// Customer signup & login
router.post('/signup', signup);
router.post('/login',  login);

module.exports = router;

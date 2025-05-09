// src/routes/siteSettingsRoutes.js
const express = require('express');
const {
  getSettings,
  updateSettings
} = require('../controllers/siteSettingsController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Public: fetch site-wide settings
router.get('/', getSettings);

// Admin: update colors, marquee texts, social links, etc.
router.put('/', protect, admin, updateSettings);

module.exports = router;

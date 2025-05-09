// src/routes/countryRateRoutes.js
const express = require('express');
const {
  createRate,
  getRates,
  getRateById,
  updateRate,
  deleteRate
} = require('../controllers/countryRateController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router
  .route('/')
  .get( getRates )
  .post(protect, admin, createRate);

router
  .route('/:id')
  .get(    getRateById )
  .put(   protect, admin, updateRate )
  .delete(protect, admin, deleteRate);

module.exports = router;

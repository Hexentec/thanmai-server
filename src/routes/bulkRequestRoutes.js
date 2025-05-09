// src/routes/bulkRequestRoutes.js
const express = require('express');
const {
  createBulkRequest,
  getBulkRequests
} = require('../controllers/bulkRequestController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Public: submit a bulk-order request
router.post('/', createBulkRequest);

// Admin: view all bulk requests
router.get('/', protect, admin, getBulkRequests);

module.exports = router;

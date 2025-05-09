// src/routes/productRoutes.js
const express = require('express');
const multer  = require('multer');
const storage = require('../utils/cloudinary');
const upload  = multer({ storage });

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public: list & view
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin-only: create/update/delete (with multiple image uploads)
router.post('/',    protect, admin, upload.array('images', 5), createProduct);
router.put('/:id',  protect, admin, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;

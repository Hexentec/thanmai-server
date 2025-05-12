// src/routes/productRoutes.js
const express = require('express');
const multer  = require('multer');
const storage = require('../utils/cloudinary');       // or your local-storage setup
const upload  = multer({ storage });

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/',    getAllProducts);
router.get('/:id', getProductById);

// Admin‐only routes
router.post(
  '/', 
  protect, 
  admin, 
  upload.array('images', 5), 
  createProduct
);
router.put(
  '/:id',
  protect,
  admin,
  upload.array('images', 5),
  updateProduct
);
router.delete(
  '/:id',
  protect,
  admin,
  deleteProduct
);

module.exports = router;

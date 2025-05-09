// src/routes/categoryRoutes.js
const express = require('express');
const multer  = require('multer');
const storage = require('../utils/cloudinary');
const upload  = multer({ storage });

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public: read-only
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Admin-only: create/update/delete (with image upload)
router.post('/',    protect, admin, upload.single('image'), createCategory);
router.put('/:id',  protect, admin, upload.single('image'), updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;

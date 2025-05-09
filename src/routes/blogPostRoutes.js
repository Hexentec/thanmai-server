// src/routes/blogPostRoutes.js
const express = require('express');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/blogPostController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router
  .route('/')
  .get( getPosts )
  .post(protect, admin, createPost);

router
  .route('/:id')
  .get(    getPostById )
  .put(   protect, admin, updatePost )
  .delete(protect, admin, deletePost);

module.exports = router;

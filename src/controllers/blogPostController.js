// src/controllers/blogPostController.js
const BlogPost = require('../models/BlogPost');

exports.createPost = async (req, res, next) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.published === 'true') {
      filter.publishedAt = { $lte: new Date() };
    }
    const posts = await BlogPost.find(filter).sort('order');
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

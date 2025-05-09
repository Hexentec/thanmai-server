// src/controllers/testimonialController.js
const Testimonial = require('../models/Testimonial');

exports.createTestimonial = async (req, res, next) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    next(err);
  }
};

exports.getTestimonials = async (req, res, next) => {
  try {
    const list = await Testimonial.find().sort('order');
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.getTestimonialById = async (req, res, next) => {
  try {
    const t = await Testimonial.findById(req.params.id);
    res.json(t);
  } catch (err) {
    next(err);
  }
};

exports.updateTestimonial = async (req, res, next) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    res.json(t);
  } catch (err) {
    next(err);
  }
};

exports.deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

// src/controllers/userController.js
const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const updates = { name: req.body.name, email: req.body.email };
    if (req.body.password) updates.password = req.body.password;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    }).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

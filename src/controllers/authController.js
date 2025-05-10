// src/controllers/authController.js
const jwt    = require('jsonwebtoken');
const Admin  = require('../models/Admin');
const User   = require('../models/User');

// Generate JWT (7-day expiry)
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    const token = generateToken(admin._id, 'admin');
    // Return both token and admin info:
+   res.json({
       token,
       user: {
         id: admin._id,
         email: admin.email,
         role: 'admin'
       }
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id, 'user');
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id, 'user');
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    next(err);
  }
};

// src/server.js

require('dotenv').config();
const express           = require('express');
const cors              = require('cors');
const compression       = require('compression');
const connectDB         = require('./config/db');
const errorHandler      = require('./middleware/errorHandler');

// Route imports
const authRoutes        = require('./routes/authRoutes');
const userRoutes        = require('./routes/userRoutes');
const categoryRoutes    = require('./routes/categoryRoutes');
const productRoutes     = require('./routes/productRoutes');
const orderRoutes       = require('./routes/orderRoutes');
const cartRoutes        = require('./routes/cartRoutes');
const couponRoutes      = require('./routes/couponRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const bulkRequestRoutes = require('./routes/bulkRequestRoutes');
const blogPostRoutes    = require('./routes/blogPostRoutes');
const countryRateRoutes = require('./routes/countryRateRoutes');
const siteSettingsRoutes= require('./routes/siteSettingsRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// API Routes
app.use('/api/auth',           authRoutes);
app.use('/api/users',          userRoutes);
app.use('/api/categories',     categoryRoutes);
app.use('/api/products',       productRoutes);
app.use('/api/orders',         orderRoutes);
app.use('/api/cart',           cartRoutes);
app.use('/api/coupons',        couponRoutes);
app.use('/api/testimonials',   testimonialRoutes);
app.use('/api/bulk-requests',  bulkRequestRoutes);
app.use('/api/blog-posts',     blogPostRoutes);
app.use('/api/country-rates',  countryRateRoutes);
app.use('/api/site-settings',  siteSettingsRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

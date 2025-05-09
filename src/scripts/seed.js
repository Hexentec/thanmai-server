// backend/src/scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

// Models
const Admin         = require('../models/Admin');
const User          = require('../models/User');
const Category      = require('../models/Category');
const Product       = require('../models/Product');
const Testimonial   = require('../models/Testimonial');
const BulkRequest   = require('../models/BulkRequest');
const BlogPost      = require('../models/BlogPost');
const CountryRate   = require('../models/CountryRate');
const SiteSettings  = require('../models/SiteSettings');

async function seed() {
  try {
    // Connect to DB
    await connectDB();

    // 1. Clear existing data
    await Promise.all([
      Admin.deleteMany(),
      User.deleteMany(),
      Category.deleteMany(),
      Product.deleteMany(),
      Testimonial.deleteMany(),
      BulkRequest.deleteMany(),
      BlogPost.deleteMany(),
      CountryRate.deleteMany(),
      SiteSettings.deleteMany(),
    ]);

    // 2. Create admin and test user
    const admin = await Admin.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'Admin@123'
    });
    const user = await User.create({
      name: 'Test User',
      email: 'user@example.com',
      password: 'User@123'
    });

    // 3. Seed categories
    const categories = await Category.insertMany([
      { name: 'Mango Pickle', slug: 'mango-pickle', order: 1 },
      { name: 'Mixed Veg',    slug: 'mixed-veg',    order: 2 },
      { name: 'Garlic Pickle',slug: 'garlic-pickle',order: 3 },
    ]);

    // 4. Seed products (one per category example)
    const products = await Product.insertMany([
      {
        name: 'Tangy Mango Pickle',
        slug: 'tangy-mango-pickle',
        category: categories[0]._id,
        description: 'Homemade tangy mango pickle.',
        ingredients: 'Raw mangoes, mustard oil, spices.',
        images: ['/images/products/mango1.jpg'],
        variants: [
          { weight: '250g', pricesByCountry: { India: 150 } },
          { weight: '500g', pricesByCountry: { India: 280 } },
        ],
        isFeatured: true,
        isMustTry:  false,
        bundleDiscountPct: 5,
        ratingsAvg: 4.5,
        orderCount24h: 20,
        viewCountNow:  5
      },
      {
        name: 'Spicy Mixed Veg Pickle',
        slug: 'spicy-mixed-veg-pickle',
        category: categories[1]._id,
        description: 'Assorted veg pickle with chilli kick.',
        ingredients: 'Carrot, cauliflower, green chilli, spices.',
        images: ['/images/products/mixed1.jpg'],
        variants: [
          { weight: '300g', pricesByCountry: { India: 160 } },
        ],
        isFeatured: false,
        isMustTry:  true,
        bundleDiscountPct: 0,
        ratingsAvg: 4.2,
        orderCount24h: 10,
        viewCountNow:  2
      },
      {
        name: 'Garlic Pickle Deluxe',
        slug: 'garlic-pickle-deluxe',
        category: categories[2]._id,
        description: 'Premium garlic pickle in mustard oil.',
        ingredients: 'Garlic, mustard oil, salt, spices.',
        images: ['/images/products/garlic1.jpg'],
        variants: [
          { weight: '200g', pricesByCountry: { India: 140 } },
        ],
        isFeatured: true,
        isMustTry:  true,
        bundleDiscountPct: 10,
        ratingsAvg: 4.8,
        orderCount24h: 30,
        viewCountNow:  8
      },
    ]);

    // 5. Seed a testimonial
    await Testimonial.insertMany([
      {
        authorName: 'Jane Doe',
        authorPhoto: '/images/testimonials/jane.jpg',
        quote: 'The best pickles I have ever tasted!',
        rating: 5,
        order: 1
      }
    ]);

    // 6. Seed a blog post
    await BlogPost.insertMany([
      {
        title: 'How to Enjoy Pickles with Every Meal',
        excerpt: 'Discover tasty pairings for your favorite pickles...',
        content: '<p>Full markdown or HTML content here.</p>',
        slug: 'enjoy-pickles-with-every-meal',
        coverImage: '/images/blog/pickle-meals.jpg',
        publishedAt: new Date(),
        order: 1
      }
    ]);

    // 7. Seed country rates
    await CountryRate.insertMany([
      { country: 'India', shippingPrice: 50, order: 1 },
      { country: 'USA',   shippingPrice: 500, order: 2 }
    ]);

    // 8. Seed site settings
    await SiteSettings.create({
      primaryColor: '#A01d46',
      lightColor: '#f5f5f5',
      marqueeTexts: ['Welcome to Our Pickle Shop!', 'Free shipping on ₹999+'],
      footerText: '© 2025 Your Pickle Shop',
      socialLinks: {
        facebook:  'https://facebook.com/yourpage',
        instagram: 'https://instagram.com/yourpage',
        whatsapp:  'https://wa.me/1234567890'
      }
    });

    console.log('✅ Data seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();

const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  primaryColor: { type: String, default: '#A01d46' },
  lightColor:   { type: String, default: '#f5f5f5' },
  marqueeTexts: [String],
  footerText:   String,
  socialLinks: {
    facebook:  String,
    instagram: String,
    whatsapp:  String,
  }
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
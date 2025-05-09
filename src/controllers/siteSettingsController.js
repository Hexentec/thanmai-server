// src/controllers/siteSettingsController.js
const SiteSettings = require('../models/SiteSettings');

exports.getSettings = async (req, res, next) => {
  try {
    let cfg = await SiteSettings.findOne();
    if (!cfg) {
      cfg = await SiteSettings.create({});
    }
    res.json(cfg);
  } catch (err) {
    next(err);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const cfg = await SiteSettings.findOneAndUpdate({}, req.body, {
      new: true, upsert: true, runValidators: true
    });
    res.json(cfg);
  } catch (err) {
    next(err);
  }
};

// src/controllers/countryRateController.js
const CountryRate = require('../models/CountryRate');

exports.createRate = async (req, res, next) => {
  try {
    const rate = await CountryRate.create(req.body);
    res.status(201).json(rate);
  } catch (err) {
    next(err);
  }
};

exports.getRates = async (req, res, next) => {
  try {
    const rates = await CountryRate.find().sort('order');
    res.json(rates);
  } catch (err) {
    next(err);
  }
};

exports.getRateById = async (req, res, next) => {
  try {
    const rate = await CountryRate.findById(req.params.id);
    res.json(rate);
  } catch (err) {
    next(err);
  }
};

exports.updateRate = async (req, res, next) => {
  try {
    const rate = await CountryRate.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    res.json(rate);
  } catch (err) {
    next(err);
  }
};

exports.deleteRate = async (req, res, next) => {
  try {
    await CountryRate.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

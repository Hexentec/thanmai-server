const mongoose = require('mongoose');

const countryRateSchema = new mongoose.Schema({
  country:      { type: String, required: true, unique: true },
  shippingPrice:{ type: Number, required: true },
  order:        { type: Number, default: 0 },
});

module.exports = mongoose.model('CountryRate', countryRateSchema);
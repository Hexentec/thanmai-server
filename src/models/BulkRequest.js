const mongoose = require('mongoose');

const bulkRequestSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      String,
  company:    String,
  details:    { type: String, required: true },
  sentAt:     { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('BulkRequest', bulkRequestSchema);
// src/controllers/bulkRequestController.js
const BulkRequest = require('../models/BulkRequest');

exports.createBulkRequest = async (req, res, next) => {
  try {
    const br = await BulkRequest.create(req.body);
    res.status(201).json(br);
  } catch (err) {
    next(err);
  }
};

exports.getBulkRequests = async (req, res, next) => {
  try {
    const list = await BulkRequest.find().sort('-sentAt');
    res.json(list);
  } catch (err) {
    next(err);
  }
};
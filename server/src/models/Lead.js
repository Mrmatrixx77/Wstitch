// const express = require('express');
// const router = express.Router();
// const Lead = require('../models/Lead');
// const logger = require('../utils/logger');

// // Create lead
// router.post('/', async (req, res, next) => {
//   try {
//     const { name, email, phone, message, source } = req.body;
//     if (!name || !email || !phone) {
//       return res.status(400).json({ success: false, error: 'name, email and phone are required' });
//     }

//     const lead = new Lead({ name, email, phone, message, source: source || 'website' });
//     await lead.save();

//     // Minimal logging
//     logger.info({ evt: 'lead.created', id: lead._id, email: lead.email });

//     // TODO: queue email/notify team
//     res.status(201).json({ success: true, data: { id: lead._id } });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;
// src/models/Lead.js
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, lowercase: true, trim: true, maxlength: 120, index: true },
  phone: { type: String, required: true, trim: true, maxlength: 32 },
  message: { type: String, trim: true, maxlength: 2000 },
  source: { type: String, default: 'website' },
  files: [String],
  status: { type: String, enum: ['new','contacted','quoted','closed'], default: 'new' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  createdAt: { type: Date, default: Date.now }
});

// Export the model (COMMONJS)
module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);

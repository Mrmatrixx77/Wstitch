// src/controllers/lead.controller.js
const Lead = require('../models/Lead');

exports.createLead = async (req, res, next) => {
  try {
    // Basic guard — required fields
    const { name, email, phone, message, source } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, error: 'name, email and phone are required' });
    }

    // Use create (or new + save)
    const lead = await Lead.create({ name, email, phone, message, source: source || 'website' });

    return res.status(201).json({ success: true, data: { id: lead._id } });
  } catch (err) {
    next(err);
  }
};


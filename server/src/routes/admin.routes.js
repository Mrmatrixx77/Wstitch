// src/routes/admin.routes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const router = express.Router();
const Lead = require('../models/Lead');
const User = require('../models/User');
const { requireAuth, requireAdmin } = require('../middlewares/auth.middleware');
const logger = require('../utils/logger'); // optional; use if available

// Helper: simple email validator
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Helper: sanitize & normalize email
function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

/**
 * GET /api/admin/leads
 * Admin-only access — paginated
 */
router.get('/leads', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Lead.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments()
    ]);

    res.json({
      success: true,
      data: leads,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/create-admin
 * Admin-only: create a new admin user (server-side hashed password)
 *
 * Body: { email, password, name? }
 */
router.post('/createadmin', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { email, password, name } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'email and password are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'invalid email' });
    }

    if (typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ success: false, error: 'password must be at least 8 characters' });
    }

    const normalizedEmail = normalizeEmail(email);

    // Check existing user
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ success: false, error: 'user with this email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user document
    const u = new User({
      email: normalizedEmail,
      passwordHash,
      role: 'admin',
      name: name || null,
      createdBy: req.user.id
    });

    await u.save();

    logger?.info && logger.info({ actor: req.user.id, target: u._id }, 'admin.created');

    return res.status(201).json({
      success: true,
      data: {
        id: u._id.toString(),
        email: u.email,
        role: u.role,
        name: u.name || null,
        createdAt: u.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

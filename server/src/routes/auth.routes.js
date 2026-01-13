// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth } = require('../middlewares/auth.middleware');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const COOKIE_MAX_AGE =
  parseInt(process.env.JWT_COOKIE_EXPIRES_MS, 10) || 24 * 60 * 60 * 1000; // 1 day
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'token';

/**
 * Helper: build safe cookie options
 * - Dev (localhost, http): SameSite=Lax, Secure=false
 * - Prod (https): SameSite=None (if needed), Secure=true
 */
function getCookieOptions() {
  const isProd = process.env.NODE_ENV === 'production';

  // Default behavior:
  // - dev: lax (works on localhost ports)
  // - prod: none (for cross-site if needed)
  let sameSite = isProd ? 'none' : 'lax';

  // Allow override via env, but keep it safe
  if (process.env.COOKIE_SAME_SITE) {
    sameSite = process.env.COOKIE_SAME_SITE.toLowerCase();
  }

  // Browsers REQUIRE Secure=true if SameSite=None
  const secure = isProd && sameSite === 'none';

  return {
    httpOnly: true,
    secure,
    sameSite,
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  };
}

/**
 * POST /api/auth/login
 * - verifies credentials
 * - sets httpOnly cookie with JWT
 * - returns user info (no token)
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: 'email & password required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.isDisabled) {
      return res
        .status(401)
        .json({ success: false, error: 'invalid credentials' });
    }

    const isValid = await user.verifyPassword(password);
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, error: 'invalid credentials' });
    }

    // Create JWT
    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set cookie safely
    res.cookie(COOKIE_NAME, token, getCookieOptions());

    // Update lastLogin asynchronously (best-effort)
    user.lastLogin = new Date();
    user.save().catch(() => {});

    return res.json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          name: user.name || null
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/auth/me
 * - requires valid JWT cookie
 * - returns current user
 */
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: 'Not authenticated' });
    }

    let name = req.user.name || null;

    // Fetch name only if missing
    if (!name) {
      const u = await User.findById(req.user.id)
        .select('name')
        .lean();
      if (u?.name) name = u.name;
    }

    return res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role,
          name: name
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/createadmin', requireAuth, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'email and password are required'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists'
      });
    }

    // ✅ create admin using model helper
    const newAdmin = await User.createWithPassword(
      normalizedEmail,
      password,
      'admin',
      name || 'Admin'
    );

    return res.status(201).json({
      success: true,
      data: {
        id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role,
        name: newAdmin.name
      }
    });
  } catch (err) {
    console.error('Create admin failed:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});




/**
 * POST /api/auth/logout
 * - clears auth cookie
 */
router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
  });

  return res.json({ success: true });
});

module.exports = router;



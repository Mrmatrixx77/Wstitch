// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

/**
 * Require valid JWT.
 * Looks for token in httpOnly cookie `token` first, then Authorization header.
 * Attaches user info to req.user.
 */
exports.requireAuth = async (req, res, next) => {
  try {
    // Prefer cookie (httpOnly) for security
    let token = req.cookies && req.cookies.token;

    // Backwards-compatible: accept Authorization header if cookie is absent
    if (!token) {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
      }
      token = authHeader.split(' ')[1];
    }

    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(payload.sub);
    if (!user || user.isDisabled) {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' });
    }

    // attach minimal user info for downstream middleware/controllers
    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};

/**
 * Require admin role (must run AFTER requireAuth)
 */
exports.requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Admins only' });
  }
  next();
};

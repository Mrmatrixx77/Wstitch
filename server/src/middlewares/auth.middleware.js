const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

/**
 * Require valid JWT
 * Attaches user to req.user
 */
exports.requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const token = authHeader.split(' ')[1];

    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(payload.sub);
    if (!user || user.isDisabled) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }

    // attach minimal user info
    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

/**
 * Require admin role
 * Must be used AFTER requireAuth
 */
exports.requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Admins only'
    });
  }
  next();
};

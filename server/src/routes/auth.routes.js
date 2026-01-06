const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'email & password required'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.isDisabled) {
      return res.status(401).json({
        success: false,
        error: 'invalid credentials'
      });
    }

    const isValid = await user.verifyPassword(password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'invalid credentials'
      });
    }

    // update last login (non-blocking)
    user.lastLogin = new Date();
    user.save().catch(() => {});

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          email: user.email,
          role: user.role,
          name: user.name
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

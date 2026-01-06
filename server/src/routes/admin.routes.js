const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { requireAuth, requireAdmin } = require('../middlewares/auth.middleware');

/**
 * GET /api/admin/leads
 * Admin-only access
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

module.exports = router;

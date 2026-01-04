const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error({ err, url: req.originalUrl });
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'server error' : (err.message || 'server error');
  res.status(status).json({ success: false, error: message });
}

module.exports = { errorHandler };

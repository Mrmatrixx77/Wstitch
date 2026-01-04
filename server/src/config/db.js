const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (uri) => {
  await mongoose.connect(uri, {
    autoIndex: true,
  });
  logger.info('MongoDB connected');
};

module.exports = connectDB;

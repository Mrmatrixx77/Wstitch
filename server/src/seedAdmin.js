require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const logger = require('./utils/logger');

const adminEmail = process.env.ADMIN_EMAIL || 'admin@wstitch.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

async function seed() {
  try {
    await connectDB(process.env.MONGO_URI);
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      logger.info('Admin already exists');
      process.exit(0);
    }
    const hash = await bcrypt.hash(adminPassword, 12);
    const u = new User({ email: adminEmail.toLowerCase(), passwordHash: hash, name: 'Admin' });
    await u.save();
    logger.info('Admin created', adminEmail);
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}
seed();

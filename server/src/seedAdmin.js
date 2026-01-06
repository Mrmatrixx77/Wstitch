require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const logger = require('./utils/logger');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  console.error('❌ ADMIN_EMAIL or ADMIN_PASSWORD missing');
  process.exit(1);
}

async function seedAdmin() {
  try {
    await connectDB(process.env.MONGO_URI);

    const existing = await User.findOne({ email: adminEmail.toLowerCase() });
    if (existing) {
      logger.info('✅ Admin already exists');
      process.exit(0);
    }

    await User.createWithPassword(
      adminEmail,
      adminPassword,
      'admin',
      'Admin'
    );

    logger.info(`🚀 Admin created: ${adminEmail}`);
    process.exit(0);
  } catch (err) {
    logger.error(err, '❌ Failed to seed admin');
    process.exit(1);
  }
}

seedAdmin();

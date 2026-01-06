// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // npm i bcryptjs
const { Schema } = mongoose;

const SALT_ROUNDS = 12;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user', index: true },
  name: { type: String, default: '' },
  isDisabled: { type: Boolean, default: false },
  lastLogin: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Instance method to verify a plaintext password
UserSchema.methods.verifyPassword = async function (plainPassword) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(plainPassword, this.passwordHash);
};

// Static helper to create a user with plaintext password (hashing done here)
UserSchema.statics.createWithPassword = async function (email, plainPassword, role = 'user', name = '') {
  const passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  const doc = new this({ email: String(email).toLowerCase(), passwordHash, role, name });
  await doc.save();
  return doc;
};

// Optional helper to update lastLogin
UserSchema.methods.touchLastLogin = async function () {
  this.lastLogin = new Date();
  await this.save();
};

// Avoid model overwrite errors in dev (nodemon/hot reload)
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

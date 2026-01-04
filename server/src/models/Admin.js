// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('Admin', AdminSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phoneNumber: String,
  password: String,
  role: { type: String, enum: ['buyer', 'seller'] },
});

// Ensure indexes are created
userSchema.index({ email: 1 }, { name: 'unique_email_index', unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

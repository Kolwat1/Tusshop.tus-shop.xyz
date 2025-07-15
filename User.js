const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'reseller' }, // or 'admin'
  balance: { type: Number, default: 100 }
});

module.exports = mongoose.model('User', UserSchema);

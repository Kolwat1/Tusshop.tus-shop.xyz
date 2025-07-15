const mongoose = require('mongoose');

const KeySchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  game: { type: String, required: true },
  devices: { type: Number, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  isSold: { type: Boolean, default: false },
  soldTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  soldAt: { type: Date }
});

module.exports = mongoose.model('Key', KeySchema);

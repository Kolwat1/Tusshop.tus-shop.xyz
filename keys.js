const express = require('express');
const router = express.Router();
const Key = require('../models/Key');
const User = require('../models/User');

// POST /api/keys/generate
router.post('/generate', async (req, res) => {
  const { userId, game, devices, duration, price } = req.body;
  const user = await User.findById(userId);
  const totalCost = devices * price * duration;
  if (user.balance < totalCost) {
    return res.json({ success: false, message: 'ยอดเงินไม่พอ' });
  }
  user.balance -= totalCost;
  await user.save();
  const code = Math.random().toString(36).substr(2, 10).toUpperCase();
  const key = new Key({ code, game, devices, duration, price, createdBy: userId });
  await key.save();
  res.json({ success: true, key: code, balance: user.balance });
});

// GET /api/keys/all
router.get('/all', async (req, res) => {
  const keys = await Key.find().populate('createdBy soldTo', 'username');
  res.json(keys);
});

module.exports = router;

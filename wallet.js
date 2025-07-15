const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/wallet/:userId
router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.json({ success: false });
  res.json({ success: true, balance: user.balance });
});

module.exports = router;

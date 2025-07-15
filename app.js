const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const keyRoutes = require('./routes/keys');
const walletRoutes = require('./routes/wallet');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/keypanel', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/auth', authRoutes);
app.use('/api/keys', keyRoutes);
app.use('/api/wallet', walletRoutes);

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

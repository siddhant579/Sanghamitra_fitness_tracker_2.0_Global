const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const workoutRoutes = require('./routes/workoutRoutes');
app.use('/api/workouts', workoutRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);

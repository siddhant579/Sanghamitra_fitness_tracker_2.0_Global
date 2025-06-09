const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  exercise: String,
  time: Number,
  calories: Number,
  date: { type: Date, default: Date.now }
});

const workoutSchema = new mongoose.Schema({
  name: String,
  age: Number,
  weight: Number,
  entries: [entrySchema]
});

module.exports = mongoose.model('Workout', workoutSchema);

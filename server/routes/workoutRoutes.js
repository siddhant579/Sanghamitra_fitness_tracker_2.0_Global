const express = require('express');
const router = express.Router();
const Workout = require('../models/workout');

// POST route
router.post('/', async (req, res) => {
  const { name, age, weight, exercise, time, calories } = req.body;
  try {
    let user = await Workout.findOne({ name });
    if (user) {
      user.entries.push({ exercise, time, calories });
      await user.save();
      res.status(200).json(user);
    } else {
      const newUser = new Workout({
        name,
        age,
        weight,
        entries: [{ exercise, time, calories }]
      });
      const saved = await newUser.save();
      res.status(201).json(saved);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET route
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const data = name
      ? await Workout.findOne({ name })
      : await Workout.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

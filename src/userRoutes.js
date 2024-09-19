const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');
const User = require('./models/User');

// Add Country
router.post('/addCountry', authMiddleware, async (req, res) => {
  try {
    const { country } = req.body;
    const user = req.user; // User is set by the authMiddleware

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.countries.includes(country)) {
      return res.status(400).send({ message: 'Country already added' });
    }

    user.countries.push(country);
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Remove Country
router.post('/removeCountry', authMiddleware, async (req, res) => {
  try {
    const { country } = req.body;
    const user = req.user; // User is set by the authMiddleware

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!user.countries.includes(country)) {
      return res.status(400).send({ message: 'Country not found in user\'s list' });
    }

    user.countries = user.countries.filter(c => c !== country);
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Get Countries
router.get('/countries', authMiddleware, async (req, res) => {
  try {
    const user = req.user; // User is set by the authMiddleware

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user.countries);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;

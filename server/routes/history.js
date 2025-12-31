const express = require('express');
const router = express.Router();
const Search = require('../models/Search');

router.get('/history', async (req, res) => {
  try {
    const history = await Search.find().sort({ timestamp: -1 }).limit(10);
    res.json(history.map(item => ({
      city: item.city,
      timestamp: item.timestamp
    })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const MarketApi = require('../api/marketApi');

// Add middleware to parse JSON-encoded bodies
router.use(express.json());

router.post('/getWorldMarketSearchList', async (req, res) => {
  try {
    const { searchResult } = req.body;
    const result = await MarketApi.getWorldMarketSearchList(searchResult);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting world market search list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
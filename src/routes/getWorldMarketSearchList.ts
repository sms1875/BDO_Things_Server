import express, { Request, Response } from 'express';
import MarketApi from '../api/marketApi';

const router = express.Router();

// Add middleware to parse JSON-encoded bodies
router.use(express.json());

router.post('/getWorldMarketSearchList', async (req: Request, res: Response) => {
  try {
    const { searchResult } = req.body;
    const result = await MarketApi.getWorldMarketSearchList(searchResult);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting world market search list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
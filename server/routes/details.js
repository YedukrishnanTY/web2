
import express from "express";
const router = express.Router();

router.get('/details', async (req, res) => {
  try {
    // const collection = db.collection('details');

    // const results = await collection.find({}).toArray();

    // res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch details' });
  }
});

export default router;

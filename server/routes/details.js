// routes/details.js
const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const client = req.app.locals.client.db("personal-details");
    const collection = client.collection("details");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch details." });
  }
});

module.exports = router;

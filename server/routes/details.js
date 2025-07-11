// routes/details.js
const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");

require('dotenv').config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

router.get("/", async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("personal-details").collection("details");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch details." });
  } finally {
    await client.close();
  }
});

module.exports = router;

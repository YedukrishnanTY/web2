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

router.post("/", async (req, res) => {
    try {
        const newCoffee = req.body; // This is the data sent by the client

        if (!newCoffee || Object.keys(newCoffee).length === 0) {
            return res.status(400).json({ error: "Payload is missing or empty." });
        }

        await client.connect();
        const collection = client.db("personal-details").collection("coffee");

        const result = await collection.insertOne(newCoffee);

        res.status(201).json({
            message: "Coffee document added successfully.",
            insertedId: result.insertedId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to insert coffee document." });
    } finally {
        await client.close();
    }
});

module.exports = router;

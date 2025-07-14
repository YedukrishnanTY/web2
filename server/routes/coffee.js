// routes/coffee.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { ObjectId } = require("mongodb");

router.post("/", async (req, res) => {
    try {
        const newCoffee = req.body;

        if (!newCoffee || Object.keys(newCoffee).length === 0) {
            return res.status(400).json({ error: "Payload is missing or empty." });
        }

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        const coffeeDoc = {
            ...newCoffee,
            ip,
            userAgent,
        };

        const client = req.app.locals.client.db("personal-details");
        const collection = client.collection("coffee");

        const result = await collection.insertOne(coffeeDoc);

        res.status(201).json({
            message: "Coffee document added successfully.",
            insertedId: result.insertedId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to insert coffee document." });
    }
});

router.get("/all", verifyToken, async (req, res) => {
    try {
        const client = req.app.locals.client.db("personal-details");
        const collection = client.collection("coffee");
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch details." });
    }
});


router.delete("/", verifyToken, async (req, res) => {
    try {
        const { _id } = req.body;
        const client = req.app.locals.client.db("personal-details");
        const collection = client.collection("coffee");

        const result = await collection.deleteOne({ _id: new ObjectId(_id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Document not found." });
        }

        res.status(200).json({ message: "Document deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete document." });
    }
});


module.exports = router;

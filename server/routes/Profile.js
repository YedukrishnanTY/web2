const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth'); 
require('dotenv').config();

router.get("/", verifyToken, async (req, res) => {
    try {
        const client = req.app.locals.client.db("personal-details");
        const collection = client.collection("profile");

        // req.user was set by the auth middleware
        const user = await collection.findOne(
            { email: req.user.email },
            { projection: { password: 0 } } // Do NOT return password!
        );

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ profile: user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch profile." });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET; // Example: 'supersecret'
const JWT_EXPIRES_IN = '7d'; // adjust as needed


// Login route
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required." });
    }

    const client = req.app.locals.client.db("personal-details");
    const collection = client.collection("profile");

    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Create JWT payload
    const tokenPayload = { email };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    // Set JWT as HTTP-only cookie
    res.cookie('a', token, {
      httpOnly: true,
      secure: true, // ⚠️ Set to true in production behind HTTPS
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({ message: "Login successful." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
});










// Signup route
// router.post("/signup", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password required." });
//     }

//     const client = req.app.locals.client.db("personal-details");
//     const collection = client.collection("profile");

//     const existingUser = await collection.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ error: "User already exists." });
//     }

//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = { email, password: hashedPassword };
//     await collection.insertOne(newUser);

//     // Create JWT payload — never store sensitive info like the raw password
//     const tokenPayload = { email };
//     const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//     // Set JWT as HTTP-only cookie
//     res.cookie('a', token, {
//       httpOnly: true,
//       secure: true, // ⚠️ Set to true in production behind HTTPS
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });

//     res.status(201).json({ message: "User registered successfully." });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Signup failed." });
//   }
// });


module.exports = router;

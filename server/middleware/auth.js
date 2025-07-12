// middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const token = req.cookies.a;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Now req.user has { email } or whatever you put in the token
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token.' });
  }
}

module.exports = verifyToken;

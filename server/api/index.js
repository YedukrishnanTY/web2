const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const details = require('../routes/details.js');
const coffee = require('../routes/coffee.js');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use("/details", details);
app.use("/coffee", coffee);

const port = process.env.PORT || 3001;

// ✅ If run locally, start a server:
if (process.env.NODE_ENV !=='production') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

// ✅ Always export for serverless:
exports.handler = serverlessExpress({ app });

// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const { MongoClient, ServerApiVersion } = require("mongodb");

const details = require('./routes/details.js');
const coffee = require('./routes/coffee.js');
const Auth = require('./routes/Auth.js');
const Profile = require('./routes/Profile.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000', 'https://yedu.is-a.dev',],
  credentials: true,
}));

const client = new MongoClient(process.env.MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    app.locals.client = client;

    // ✅ Use routes
    app.use("/details", details);
    app.use("/coffee", coffee);
    app.use("/login", Auth);
    app.use("/profile", Profile);

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();

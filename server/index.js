
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const details = require("./routes/details.js");
const coffee = require("./routes/coffee.js");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
const corsOptions = {
    origin: process.env.CLIENT_URL,  // <-- use .env
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));


app.use("/details", details);
app.use("/coffee", coffee);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

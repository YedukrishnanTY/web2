
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors= require("cors");
const helmet= require("helmet");
const morgan= require("morgan");
const express= require("express");
const details= require("./routes/details.js");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());


// app.use("/auth", details);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
const uri = process.env.MONGO_URL || null;
if (uri) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
    );
    async function run() {
        try {
            // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);
}
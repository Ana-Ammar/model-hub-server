const express = require("express");
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5165;

// Middleware
app.use(cors());
app.use(express.json());

// Mongodb Connection

const uri =
  `mongodb+srv://${process.env.MODEL_USER}:${process.env.MODEL_PASS}@cluster0.lh2xuij.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Model Hub server is runnig properly!");
});

async function run() {
  try {
    await client.connect();
    const db = client.db('model-db')
    const modelCollection = db.collection('models')

    app.get('/models', async (req, res) => {
        const result = await modelCollection.find().toArray()
        res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}

run().catch(console.dir)

app.listen(port, () => {
  console.log(`Model Hub is runnig  on port: ${port}`);
});

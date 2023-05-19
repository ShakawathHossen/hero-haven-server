const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require("dotenv").config();
const app = express()
const port= process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

// copy code from mongodb 

console.log(process.env.DB_USER, process.env.DB_PASS);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n63ev35.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // create db 
    const toysCollection= client.db("heroHaven").collection("toys");
    // create db 






// recieved add toy data from client side 
app.post('/addToy', async (req, res) => {
    const newToy = req.body;
    console.log('adding new toy: ', newToy);
    const result = await toysCollection.insertOne(newToy);
    console.log('added count', result.insertedCount);
    res.send(result)
});
// recieved add toy data from client side 
















    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// copy code from mongodb 

// root setup 
app.get('/', (req, res) => {
    res.send('Hero Haven Working')
  })


  app.listen(port, () => {
    console.log(`Hero Haven Working on port ${port}`)
  })
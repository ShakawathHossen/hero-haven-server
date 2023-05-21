const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// copy code from mongodb

// console.log(process.env.DB_USER, process.env.DB_PASS);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n63ev35.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // create db
    const toysCollection = client.db("heroHaven").collection("toys");
    // create db

    // recieved add toy data from client side
    app.post("/toys", async (req, res) => {
      const newToy = req.body;
      const result = await toysCollection.insertOne(newToy);
      res.send(result);
    });

    // read data from mongo db
    app.get("/toys", async (req, res) => {
      const query = {};
      const result = await toysCollection.find(query).toArray();
      res.send(result);
    });
    // read data from mongo db
    // find specific data from mongo db

    app.get("/toy", async (req, res) => {
      const sellerEmail = req.query.sellerEmail;
      const query = { sellerEmail: sellerEmail };
      const result = await toysCollection.find(query).toArray();
      res.send(result);
    });

    // find specific data from mongo db

    // update specific data component
    app.get("/toy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toysCollection.findOne(query);
      res.send(result);
    });


    // update specific data

    // category wise data 
     app.get('/categorytoys/:text', async (req, res) => {
      if(req.params.text=='Batman' || req.params.text=='Spiderman' || req.params.text=='IRONMAN' || req.params.text=='Naruto' || req.params.text=='Avengers')
      {
        const results = await toysCollection.find({subCategory: req.params.text})
        .toArray();
        return res.send(results);
      }
      else {
        const results = await toysCollection.find({}).toArray();
      }
     })


    // category wise data 

    // delete specific data from mongo db

    app.delete("/toy/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await toysCollection.deleteOne(query);
      res.send(result);
    });

    // delete specific data from mongo db

    // update specific data 

    app.put('/toy/:id', async (req, res) => {

      const id = req.params.id;
      const filter= {_id: new ObjectId(id)};
      const options= {upsert: true};
      const updatedToy=req.body;
      const toy={
        $set: {
          figureName:updatedToy.figureName,
          sellerName: updatedToy.sellerName,
          sellerEmail: updatedToy.sellerEmail,
          price: updatedToy.price,
          subCategory: updatedToy.subCategory,
          subCategoryCode: updatedToy.subCategoryCode,
          Ratings: updatedToy.Ratings,
          quantity: updatedToy.quantity,
          photo: updatedToy.photo,
          details: updatedToy.details,

        }
      }
      const result = await toysCollection.updateOne(filter, toy, options);
      res.send(result);
    })


    // update specific data 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// copy code from mongodb

// root setup
app.get("/", (req, res) => {
  res.send("Hero Haven Working");
});

app.listen(port, () => {
  console.log(`Hero Haven Working on port ${port}`);
});

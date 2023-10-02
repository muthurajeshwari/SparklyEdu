// Import the express module
const express = require("express");

// Create an instance of express
const app = express();

//DB Code: Starts

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = "mongodb+srv://muthurajeshwari:6vmpba3w1beF9Pyx@cluster0.j27lm1b.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidHostnames: true, // Only use this for testing
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log(" You successfully connected to MongoDB!");

  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

//DB Code: Ends

app.use(express.static(__dirname));
app.use(express.json());

//Define a route to handle requests and send the HTML file
app.get("/", (req, res) => {
  // Use res.sendFile to send the HTML file
  console.log(__dirname)
  res.sendFile(__dirname + "/login-page/newlogin.html");
});

app.get("/login", (req, res) => {
  console.log("logimm")
  res.sendFile(__dirname + "/new-signup-page/newsignup.html");
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/new-user-page/signup.html");
});

app.post("/api/addNewUser", async(req,res)=> {

  const database = client.db("sparkly-db");

  const collection = database.collection("user-collection");

  //Insert a document
  const documentToInsert = req.body;

  let result = await collection.insertOne(documentToInsert)

  if(result.acknowledged){
    console.log("Inserted Successfully")
    const jsonData = { message: 'updated' };
    res.json(jsonData);
  }

})

app.post("/api/checkuser", async(req,res)=> {

  const database = client.db("sparkly-db");

  const collection = database.collection("user-collection");

  //check the user and pwd
  const usercheck = req.body;

  try {
    // Specify the field and value to search for
    const query = { email: usercheck.email };

    // Use findOne to find a document that matches the query
    const document = await collection.findOne(query);

    if (document) {

      if(document.pass == usercheck.password){
        res.json({ message: 'Success', session:document._id, name:document.name});
        
      }else{
        res.json({ message: 'Incorrect Password' });

      }
    } else {
      res.json({ message: "Email doesn't exists, Create New Account" });
      
    }
  } catch (error) {
    console.error('Error querying MongoDB:', error);
  }
  //  res.json(usercheck);

})

app.post("/api/updateCourse", async(req, res)=>{

  const database = client.db("sparkly-db");

  const collection = database.collection("user-collection");

  const userDetails = req.body;

  const query = { _id: new ObjectId(userDetails.id) };

  // Use findOne to find a document that matches the query
  const document = await collection.findOne(query);

  if (document && document[userDetails.course] !== undefined) {
    // Field exists, add the new value to the array
    let result = await collection.updateOne(
      query,
      { $addToSet: { [userDetails.course]: userDetails.item } }
    );
    console.log(result)
  } else {
    // Field doesn't exist, create the field and add the array
    let result = await collection.updateOne(
      query,
      { $set: { [userDetails.course]: [userDetails.item] } },
      { upsert: true } // Create the document if it doesn't exist
    );
    console.log(result)
  }

  // Use findOne to find a document that matches the query
  const endDoc = await collection.findOne(query);

  let string = userDetails.course

  res.json(endDoc[string])

})

app.post("/api/getCourse", async(req, res)=>{

  const database = client.db("sparkly-db");

  const collection = database.collection("user-collection");

  const userDetails = req.body;

  const secondQuery = { _id: new ObjectId(userDetails.id) };

  // Use findOne to find a document that matches the query
  const endDoc = await collection.findOne(secondQuery);
  
  let string = userDetails.course

  if(endDoc[string]){
    res.json(endDoc[string])
  }else{
    res.json([])
  }



})


app.use((req, res) => {
  res.send("404 Error! Page doent Exist");
});

// Set the port to listen on
const port = 5500;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




const express = require("express");
const app = express();
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require("fs/promises");
require("dotenv").config();
const ejs = require("ejs");

const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
let user = localStorage.getItem("user") || "";

const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("mini-message-board").collection("messages");
  console.log(collection);
});

app.get("/", async (req, res) => {
  try {
    const collection = client.db("mini-message-board").collection("messages");
    const messages = await collection.find().toArray();
    if (user.length === 0) {
      username = "Digite seu nome:";
      route = "username";
    } else {
      username = user;
      route = "new";
    }
    const indexPage = await fs.readFile("index.ejs", "utf-8");
    res.set("Content-Type", "text/html");
    res.send(ejs.render(indexPage, { messages: messages, username, route }));
  } catch (err) {
    console.error(err);
  }
});

app.post("/new", async (req, res) => {
  try {
    const collection = client.db("mini-message-board").collection("messages");
    await collection.insertOne({ user: user, message: req.body.message });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting message");
  }
});
app.post("/username", (req, res) => {
  user = req.body.message;
  localStorage.setItem("user", user);
  res.redirect("/");
});
app.listen(3000, () => {
  console.log(`http://localhost:3000/`);
});

const express = require("express");
const fs = require("fs/promises");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { LocalStorage } = require("node-localstorage");
const localStorage = new LocalStorage("./scratch");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const messages = [];
let user = localStorage.getItem("user") || "";

messages.push({ user: "Janete8749", message: "tuts tuts quero vê" });
messages.push({ user: "Tripé de andaime", message: "Tudo em cima ?" });

app.get("/", async (req, res) => {
  if (user.length === 0) {
    username = "Digite seu nome:";
    route = "username";
  } else {
    username = user;
    route = "new";
  }
  try {
    const indexPage = await fs.readFile("index.ejs", "utf-8");
    res.set("Content-Type", "text/html");
    res.send(ejs.render(indexPage, { messages: messages, username, route }));
  } catch (err) {
    console.error(err);
  }
});

app.post("/new", (req, res) => {
  messages.push({ user: user, message: req.body.message });
  res.redirect("/");
});
app.post("/username", (req, res) => {
  user = req.body.message;
  localStorage.setItem("user", user);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`http://localhost:3000/`);
});

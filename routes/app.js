const express = require("express");
const fs = require("fs/promises");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const user = "Felipe Rangel Ribeiro";
const messages = [];
messages.push({ user: "Janete8749", message: "tuts tuts quero vê" });
messages.push({ user: "Tripé de andaime", message: "Tudo em cima ?" });

app.get("/", async (req, res) => {
  console.count(">");
  try {
    const indexPage = await fs.readFile("index.ejs", "utf-8");
    res.set("Content-Type", "text/html");
    res.send(ejs.render(indexPage, { messages: messages }));
  } catch (err) {
    console.error(err);
  }
});

app.post("/new", (req, res) => {
  messages.push({ user: user, message: req.body.message });
  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`http://localhost:3000/`);
});

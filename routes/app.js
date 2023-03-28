const express = require("express");
const fs = require("fs/promises");
const ejs = require("ejs");

const app = express();
const port = 3000;
//middleware to serve static files
app.use(express.static("public"));

//modificar e preencher esse array com resposta do panco de dados
const messages = [];
messages.push({ user: "John Doe", message: "Hello, World!" });
messages.push({ user: "Jane Debb", message: "Coe, cara!" });

app.get("/", async (req, res) => {
  try {
    const indexPage = await fs.readFile("index.ejs", "utf-8");
    res.set("Content-Type", "text/html");
    res.send(ejs.render(indexPage, { messages: messages }));
  } catch (err) {
    console.error(err);
  }
});
//port listenner
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

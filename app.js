const app = require("express");
const fs = require("fs/promises");
const express = app();
const port = 3000;

express.use(app.static("public"));

express.get("/", async (req, res) => {
  try {
    const indexPage = await fs.readFile("index.html");
    res.set("Content-Type", "text/html");
    res.send(indexPage);
  } catch (err) {
    console.error(err);
  }
});

express.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

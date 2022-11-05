require("dotenv").config();
const express = require("express");

const port = process.env.DEFAULT_PORT;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
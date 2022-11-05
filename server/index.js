require("dotenv").config();
const express = require("express");
const cors = require('cors');

const port = process.env.DEFAULT_PORT;

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));

app.get("/about", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
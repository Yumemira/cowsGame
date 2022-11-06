require("dotenv").config();
const { Client } = require("pg");
const express = require("express");
const cors = require('cors');

const port = process.env.DEFAULT_PORT;

const app = express();
const client = new Client({
  user: 'commonmanager',
  host: 'localhost',
  database: 'CowBullGameBase',
  password: 'hant8312',
  port: 23014,
});

app.use(cors({origin: process.env.REACT_FRONT_PATH}));

app.post("/register",(req, res, next) => {
  client.connect()
  
});

app.get("/about", (req, res) => {
    res.json({ message: "Love you... forever" });
  });

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
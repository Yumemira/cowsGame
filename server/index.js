require("dotenv").config();
const express = require("express");
const cors = require('cors');

const port = process.env.DEFAULT_PORT;

const app = express();

app.use(cors({origin: process.env.REACT_FRONT_PATH}));

app.get("/about", (req, res) => {
    res.json({ message: "Love you... forever" });
  });

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
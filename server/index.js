const tools = require("./additionalFunctions.js");
require("dotenv").config();

const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.DEFAULT_PORT;


app.use(express.urlencoded());
app.use(cors({origin: process.env.REACT_FRONT_PATH}));
app.use(express.json());


app.get("/about", (req, res) => {
    res.json({ message: "Love you... forever" });
});

app.post("/register",function(req, res){
  const uname = req.body.uname;
  const umail = req.body.umail;
  const upass = req.body.upassword;

/*
  tools.queryToDb(`
  INSERT INTO userstable (name, email, password)
  VALUES ('`+ uname + `', '`+ umail +`', '`+ upass +`');
  `);
*/
  tools.queryToDb("select * from userstable")
  .then((ret) => console.log(ret));
  res.json({message: "data was cathced"});
});


app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
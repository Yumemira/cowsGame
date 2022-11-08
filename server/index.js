require("dotenv").config();
const { Client } = require("pg");
const express = require("express");
const cors = require('cors');
const { query } = require("express");

const app = express();
const port = process.env.DEFAULT_PORT;
const client = new Client({
  user: 'commonmanager',
  host: 'localhost',
  database: 'CowBullGameBase',
  password: 'hant8312',
  port: 23014,
});


app.use(express.urlencoded());
app.use(cors({origin: process.env.REACT_FRONT_PATH}));
app.use(express.json());


app.get("/about", (req, res) => {
    res.json({ message: "Love you... forever" });
});

app.post("/register",function(req, res){
  console.log(req.body.title);
  res.json({message: "data was cathced"});

//  console.log(uname + " " + umail + " " + upassword);
/*
  const que = `
    INSERT INTO userstable (name, email, password)
    VALUES ('`+ uname + `', '`+ umail +`', '`+ upassword +`');
  `;

  const que = `
    INSERT INTO public.userstable (name, email, password)
    VALUES ('uname', 'umail', 'upassword');
  `;


  client.query(que, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    client.end();
});

*/
});

client.connect();


app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
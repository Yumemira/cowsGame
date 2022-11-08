require("dotenv").config();
const { Client } = require("pg");
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

  const client = new Client({
    user: 'commonmanager',
    host: 'localhost',
    database: 'CowBullGameBase',
    password: 'hant8312',
    port: 23014,
  });

  const que = `
    INSERT INTO userstable (name, email, password)
    VALUES ('`+ uname + `', '`+ umail +`', '`+ upass +`');
  `;
  client.connect();
  client.query(que, (err, res) => {
    if (err)
    {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    
    client.end();
  
  });

  res.json({message: "data was cathced"});
});





app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
require("dotenv").config();
const { Client } = require("pg");
const express = require("express");
const cors = require('cors');
const { query } = require("express");
const bp = require('body-parser');
const app = express();

const port = process.env.DEFAULT_PORT;
const client = new Client({
  user: 'commonmanager',
  host: 'localhost',
  database: 'CowBullGameBase',
  password: 'hant8312',
  port: 23014,
});

const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

app.use(cors({origin: process.env.REACT_FRONT_PATH}));



app.get("/about", (req, res) => {
    res.json({ message: "Love you... forever" });
  });

  app.post("/register",urlencodedParser,function(req, res){


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
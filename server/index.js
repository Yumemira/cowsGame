const tools = require("./additionalFunctions.js");
require("dotenv").config();

const express = require("express");
const cors = require('cors');
const { json } = require("body-parser");

const app = express();
const port = process.env.DEFAULT_PORT;


app.use(express.urlencoded());
app.use(cors({origin: process.env.REACT_FRONT_PATH}));
app.use(express.json());


// app.get()


app.post("/register",function(req, res){
  const uname = req.body.uname;
  const umail = req.body.umail;
  const upass = req.body.upassword;


  tools.queryToDb("select email from userstable where email = '" + umail + "' limit 1")
  .then((ret) => {
    if(ret.length === 0)
    {
      tools.queryToDb(`
      INSERT INTO userstable (name, email, password)
      VALUES ('`+ uname + `', '`+ umail +`', '`+ upass +`');
      `);

      res.json({message: "data was cathced"});
    }
    else
    {
      res.json({message: "email has already been used!"});
    }
  });

});

app.post("/login",function(req, res){
  const umail = req.body.umail;
  const upass = req.body.upassword;
  
  console.log(upass);

  tools.queryToDb(`select password from userstable where email = '` + umail + "' limit 1")
  .then((ret) => {
    if(ret.length === 0)
    {
      res.json({message: "Невереный логин или пароль"});
    }
    else
    {
      if(ret[0].password !== upass)
      {
        res.json({message: "неверный логин или пароль"});
      }
      else
      {
        res.json({message: "Успешный вход"});
      }
    }

  });
});


app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
require("dotenv").config();

const tools = require("./additionalFunctions.js");
const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.DEFAULT_PORT;
var cathcedList = []

app.use(express.urlencoded());
app.use(cors({origin: process.env.REACT_FRONT_PATH}));
app.use(express.json());


app.get("/pregeneratedId", function(req,res){
  res.json({id:cathcedList});
});

app.post("generatedId", function(req, res){
  cathcedList[cathcedList.length] = req.body.id;
});

app.post("/maintainceposts", function(req, res){
  const currentId = req.body.currentId;
  const maxId = currentId + 20;
  tools.queryToDb(`select * from maintainceposts where "postID" >= '`+ currentId + `' and "postID" <= '` + maxId+ "'")
  .then((ret) =>
  {
    res.json({list: ret});
  });
});

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

      res.json({message: "Успешная регистрация"});
    }
    else
    {
      res.json({message: "Эта почта уже занята"});
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
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
      const unicKey = tools.unicNumGenerator();

      tools.queryToDb(`
      INSERT INTO userstable (name, email, password, loginkey, state)
      VALUES ('`+ uname + `', '`+ umail +`', '`+ upass +`', '` + unicKey +`', 'o');
      `);

      tools.queryToDb(`select id from userstable where email = '` + umail + `' limit 1`)
      .then(uret =>{
        console.log(uret[0].id);
        res.json({message: "Успешная регистрация", lkey: unicKey, success: true, userid: uret[0].id});
      });
    }
    else
    {
      res.json({message: "Эта почта уже занята", success: false});
    }
  });
});

app.post("/profile", function(req, res){
  const id = req.body.userid;
  tools.queryToDb(`select name from userstable where id = '` + id + `' limit 1`)
  .then((ret) => {
    res.json({props:ret[0]});
  })

});

app.post("/login",function(req, res){
  const umail = req.body.umail;
  const upass = req.body.upassword;
  const lkey = req.body.loginkey;
  
  console.log(upass);

  tools.queryToDb(`select password, loginkey from userstable where email = '` + umail + "' limit 1")
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
        for(let i = 0; i < ret[0].loginkey.length; i++)
        {
          if(ret[0].loginkey[i] === lkey)
          {
            res.json({message: "Успешный вход"});
          }
        }
        res.json({message: "Точка входа неизвестна",
        requireMessage:"Пожалуйста, подтвердите новую точку входа"});
      }
    }

  });
});


app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
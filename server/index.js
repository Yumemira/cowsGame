require("dotenv").config();

const tools = require("./additionalFunctions.js");
const express = require("express");
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");


const app = express();
const port = process.env.DEFAULT_PORT;

app.use(express.urlencoded());
app.use(cors({origin: process.env.REACT_FRONT_PATH}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"http://localhost:3000",
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  
  socket.on('join_room', (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room
  });
  // We can write our socket event listeners in here...
});


app.get("/pregeneratedId", function(req,res){
  res.json({id:cathcedList});
});

app.post("generatedId", function(req, res){
  cathcedList[cathcedList.length] = req.body.id;
});

app.post("/maintainceposts", function(req, res){
  const currentId = req.body.currentId;
  const maxId = currentId + 20;
  tools.queryToDb(`select * from maintainceposts where "postID" >= $1 and "postID" <= $2`,[currentId, maxId])
  .then((ret) =>
  {
    res.json({list: ret});
  });
});

app.post("/posts", function(req, res){
  const currentId = req.body.currentId;
  const maxId = currentId + 20;
  tools.queryToDb(`select * from "Posts" where "postID" >= $1 and "postID" <= $2`,[currentId, maxId])
  .then((ret) =>
  {
    res.json({list: ret});
  });
});

app.post("/comment--send", function(req, res){
  console.log(req.body);
  tools.queryToDb(`insert into "Comments" ("postID", data, username, userid)
    values ($1, $2, $3, $4)`, [ req.body.postId, req.body.textData, req.body.author, req.body.id])
});

app.post("/comments-fetch", function(req, res){
  const postId = req.body.postId;
  tools.queryToDb(`select userid, username, data from "Comments" where "postID" = $1`,[postId])
  .then((ret) => {
    if(ret.length > 0)
    {
      res.json({message:"success", comList: ret});
    }
    else
    {
      res.json({message:"empty"});
    }
  });
});

app.post("/register",function(req, res){
  const uname = req.body.uname;
  const umail = req.body.umail;
  const upass = req.body.upassword;


  tools.queryToDb("select email from userstable where email = $1 limit 1", [umail])
  .then((ret) => {
    if(ret.length === 0)
    {
      const unicKey = tools.unicNumGenerator();

      tools.queryToDb(`
      INSERT INTO userstable (name, email, password, loginkey, state)
      VALUES ($1,$2,$3,$4, 'o');`, [uname, umail, upass, unicKey]);

      tools.queryToDb(`select id from userstable where email = $1 limit 1`,[umail])
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
  tools.queryToDb(`select name from userstable where id = $1 limit 1`,[id])
  .then((ret) => {
    res.json({props:ret[0].name});
  })

});

app.post("/login",function(req, res){
  const umail = req.body.umail;
  const upass = req.body.upassword;
  const lkey = req.body.loginkey;
  
  console.log(upass);

  tools.queryToDb(`select password, loginkey from userstable where email = $1 limit 1`, [umail])
  .then((ret) => {
    if(ret.length === 0||ret[0].password !== upass)
    {
      res.json({message: "Невереный логин или пароль"});
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
  });
});

app.post("/add-new-post", function(req,res){
  const reqData = req.body;
  tools.queryToDb(`insert into "Posts" (data, postname, userid, username)
  values ($1,$2,$3,$4)`, [reqData.text, reqData.title, reqData.uid, reqData.author])
  .then(ret =>{
    res.json({message:"success"});
  })
  .catch(err => {
    res.json({message:"Что-то пошло не так.."});
  });
});


server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
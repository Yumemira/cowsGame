require("dotenv").config();

const tools = require("./additionalFunctions.js");
const express = require("express");
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const { timeStamp } = require("console");

const app = express();
const port = process.env.DEFAULT_PORT;

app.use(express.urlencoded());
app.use(cors({origin: process.env.REACT_FRONT_PATH}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"http://192.168.1.3:3000",
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
  
  socket.on('join_room', (data) => {
    const { userid, room } = data;
    console.log(`User connected ${userid} to ${room} room`);
    socket.join(room);
  });

  socket.on('send_comment', (data) => {
    const {commentid, room} = data;
    console.log(`comment ${commentid} was sended to ${room}`);
    socket.to(room).emit('update_comments', {comment:commentid});
  });

  socket.on('leave_room', (data) => {
    const { userid, room } = data;
    socket.leave(room);
    console.log(`user ${userid} has left the room`);
  });
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
  tools.queryToDb(`select * from "Posts" where "tag" = $3 and "postID" >= $1 and "postID" <= $2`,[currentId, maxId, "maintenance"])
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
  let datestamp = new Date();
  tools.queryToDb(`select loginkey from userstable where id = $1 limit 1`,[req.body.id])
  .then(ret => {
    if(ret[0].loginkey === req.body.valid)
    {
      tools.queryToDb(`insert into "Comments" ("postID", data, username, userid, date)
      values ($1, $2, $3, $4, $5)`, [ req.body.postId, req.body.textData, req.body.author, req.body.id, datestamp])
      .then(() => {
        tools.queryToDb(`select "commentID" from "Comments" where userid = $1 and date = $2`,[req.body.id, datestamp])
        .then(dret => {
          console.log(`comment catched ${dret[0].commentID}`)
          res.json({comId:dret[0].commentID, message: "success"});
        });
      });  
    }
    else
    {
      res.json({message: "error"})
    }
  })
});

app.post("/comment-fetch", function(req, res){
  const commentId = req.body.commentId
  tools.queryToDb(`select userid, username, data from "Comments" where "commentID" = $1`,[commentId])
  .then(ret => {
    res.json({comment: ret[0], id:commentId});
  })
});

app.post("/comments-fetch", function(req, res){
  const postId = req.body.postId;
  tools.queryToDb(`select "commentID", userid, username, data from "Comments" where "postID" = $1`,[postId])
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
      VALUES ($1,$2,$3,$4, 'o');`, [uname, umail, upass, unicKey])
      .then(() => {
        tools.queryToDb(`select id from userstable where email = $1 limit 1`,[umail])
        .then(uret => {
          let tid = uret[0].id
          tid = parseInt(tid)
          res.json({message: "Успешная регистрация", lkey: unicKey, success: true, userid: uret[0].id});
        });
      })
    }
    else
    {
      res.json({message: "Эта почта уже занята", success: false});
    }
  });
});

app.post("/profile", function(req, res, next){
  const id = req.body.userid;
  if(id)
  {
    tools.queryToDb(`select name from userstable where id = $1 limit 1`,[id])
    .then((ret) => {
      res.json({props:ret[0].name});
    })
  }
  else
  {
    // error page
  }
});

app.post("/login",function(req, res){
  const umail = req.body.umail;
  const upass = req.body.upassword;
  const lkey = req.body.loginkey;

  tools.queryToDb(`select id, password, loginkey, name from userstable where email = $1 limit 1`, [umail])
  .then((ret) => {
    if(ret.length === 0||ret[0].password !== upass)
    {
      res.json({message: "Невереный логин или пароль"});
    }
    else
    {
      console.log(`Id of user is: ${ret[0].id}`)
      console.log(`Login key is ${ret[0].loginkey}`)
      
      if(ret[0].loginkey === lkey)
      {
        res.json({uid: ret[0].id, name: ret[0].name, message: "Успешный вход", lkey: ret[0].loginkey});
      }
      else
      {
        
        res.json({/*message: "Точка входа неизвестна"*/ message: "Успешный вход",
        requireMessage:"Пожалуйста, подтвердите новую точку входа",
        uid: ret[0].id, name: ret[0].name, lkey: ret[0].loginkey});    
      }
    }
  });
});

app.post("/add-new-post", function(req,res){
  const reqData = req.body;
  const timestamp = new Date();
  let tag = 'user';
  tools.queryToDb(`select rule from userstable where id = $1 limit 1`,[reqData.uid])
  .then(ret => {
    if(ret[0].rule==='a') tag = 'maintenance';

    tools.queryToDb(`insert into "Posts" (data, postname, userid, username, tag, time)
    values ($1,$2,$3,$4,$5,$6)`, [reqData.text, reqData.title, reqData.uid, reqData.author, tag, timestamp])
    .then(() => {
      res.json({message:"success"});
    })
    .catch(err => {
      res.json({message:"Что-то пошло не так.."});
    });
  })
});


server.listen(port,'192.168.1.3', () => {
  console.log(`Server listening on ${port}`);
});
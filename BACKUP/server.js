const http = require("http");
const express  = require("express");
const app = express();
 
// set the view engine to ejs
app.set('view engine', 'ejs');
   const server = http.createServer(app);
   const port = process.env.PORT || 3000;
   app.use(express.static(__dirname+'/public'))
      
      app.get("/test/:userId/:orderId",(req,resp)=>{
           console.log()
      // resp.render(__dirname+"/test",{orderId:req.params.orderId,userId:req.params.userId})
     resp.render("pages/test",{orderId:req.params.orderId,userId:req.params.userId})
      })


     app.get("/",(req,res)=>{

      res.sendFile(__dirname+"/index.html")
     });

   

  app.post("serachData",(req,res)=>{
   
  })
// socket.io setup 
   
const io = require("socket.io")(server);
  users = {};
  
  io.on("connection",(socket)=>{
   socket.on("new-user-joined",(username)=>{
      users[socket.id] = username;
     socket.broadcast.emit("user-connected",username)
    io.emit("member_list",users);
   });
 
 //   user disconnect 
    socket.on("disconnect",()=>{
       socket.broadcast.emit("user-disconnected",user=users[socket.id]);
       delete users[socket.id]; 
       io.emit("member_list",users);
    });
  
// send msg
socket.on("msg",(data)=>{
   socket.broadcast.emit("msg",data)
});


   //connection end
  });

   server.listen(port,()=>{

    console.log("server started at"+port)

   })
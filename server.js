const http = require("http");
const express  = require("express");
const mysql  = require("mysql");
const app = express();
 


// set the view engine to ejs
app.set('view engine', 'ejs');
   const server = http.createServer(app);
   const port = process.env.PORT || 3000;
   app.use(express.static(__dirname+'/public'))
     
 
    const connection = mysql.createConnection({
     host: '143.198.122.68',
     port: '3306',
     user: 'kukgaahqnz',
     password: 'rVh524GMHM',
     database: 'kukgaahqnz'
   });



      app.get("/test/:userId/:orderId/:userName",(req,resp)=>{
               
              resp.render("pages/test",{
                 orderId:req.params.orderId,
                 userId:req.params.userId,
                 userName:req.params.userName
                
             });       


      });


     app.get("/",(req,res)=>{
     
     // res.sendFile(__dirname+"/index.html")
     });


app.get("/serachData/:search",(req,resp)=>{
   
 
    
});


app.get("/GetEmployee/:search",(req,resp)=>{
   
    
  const query = req.params.search; // Get the search query from the request
 
    
   var sql = "SELECT * FROM t_users WHERE status = 'active'";
   connection.query(sql,(err,result)=>{
     
       
    resp.send(result);

   });  
    
});



app.get("/ViewMsg/:orderId",  (req,resp)=>{
   
    
  const orderId = req.params.orderId; // Get the search query from the request
  var a = [];
    
   var sql = "SELECT (SELECT CONCAT(`first_name`,' ',`last_name`) FROM t_users WHERE id = chat_order.sender_id ) as sender_name, sender_id,messages,tags_id,tags_name FROM chat_order WHERE order_id = '"+orderId+"'";
     connection.query(sql,(error, result,feilds)=>{

   resp.send(result)

     });  


    
});


app.get("/member_list/:userId",  (req,resp)=>{
   
    
  const userId = req.params.userId; // Get the search query from the request
  
    
   var sql = "SELECT order_id FROM chat_order WHERE sender_id = '"+userId+"' GROUP BY order_id ";
     connection.query(sql,(error, result,feilds)=>{

   resp.send(result)

     });  


    
});









// socket.io setup 
   
const io = require("socket.io")(server);
  users = {};
   thisUserOrderId = {};
   thisUserOrderIdarr = {};
  userKaName = {};
  
  io.on("connection",(socket)=>{

  
   socket.on("new-user-joined",(username)=>{
      users["userId"] = username.userId;
      users["orderId"] = username.orderId;
      users['username'] = username.username
      userKaName[username.userId] = username.username
      // thisUserOrderId[username.orderId] = username.orderId
      // start page reload member_list update every user reload
      // getOidqry = `SELECT order_id FROM chat_order WHERE sender_id = '${users.userId}' GROUP BY order_id`;
      // connection.query(getOidqry,(err,result,feilds)=>{
      //    if (err) throw err
      //  result.forEach((item)=>{
      //    thisUserOrderId[item.order_id] = item.order_id
      //    // thisUserOrderIdarr.push(thisUserOrderId)
      //  })
      //    // io.emit("member_list",thisUserOrderId);
      //    thisUserOrderId = {};
      // })
     socket.broadcast.emit("user-connected",userKaName[socket.id])
     
   });
 
    //   user disconnect 
    socket.on("disconnect",()=>{
       socket.broadcast.emit("user-disconnected",user= userKaName[socket.id]);
       delete  userKaName[socket.id]; 
       io.emit("member_list",userKaName);
    });
  
// send msg
socket.on("msg",(data)=>{
   currentDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
    datesTimes = currentDate.split(",");

 var curData = new Date();
    var date = curData.getFullYear()+'-'+(curData.getMonth()+1)+'-'+curData.getDate();
    // var time = curData.getHours() + ":" + curData.getMinutes() + ":" + curData.getSeconds();

    

   let qry = `INSERT INTO chat_order
           (order_id,sender_id,tags_id,tags_name,messages,dates,times) VALUES 
           ('`+data.orderId+`',
           '`+data.userId+`',
           '`+data.emps+`',
           '`+data.empsName+`',
           '`+data.msg+`',
           '`+date+`',
           '`+datesTimes[1].trimStart()+`')`;
         connection.query(qry,(err)=>{
            console.log(err)
         }) 

         a = 0;
          empname =     data.empsName.split("-");
          data.emps.forEach((ids)=>{
        let qry1 = `INSERT INTO chat_order
           (order_id,sender_id,messages,dates,times) VALUES 
           ('`+data.orderId+`',
           '`+ids+`',
           
           '`+users.username+` added `+empname[a]+` to this conversation',
           '`+date+`',
           '`+datesTimes[1].trimStart()+`')`;
         connection.query(qry1,(err)=>{
            console.log(err)
         })      
   
      a++;
       }) 

             if (data.orderId == users.orderId  ) {

             socket.broadcast.emit("msg",data)
           
             }

});

  
   //connection end
  });

   server.listen(port,()=>{

    console.log("server started at"+port)

   })
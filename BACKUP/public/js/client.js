const socket = io();

  var username;
   var chats = document.querySelector(".userjoinleft");
   var user_list = document.querySelector(".member_name");
   var user_count = document.querySelector(".list_count");
   var user_chat_UL = document.querySelector(".user_chat_area");
   var user_msg = document.querySelector("#user_msg");
   var user_msg_btn = document.querySelector("#user_msg_btn");
   
do{
    username = prompt("Enter Your Name");
}while(!username);

socket.emit("new-user-joined",username);

// user connect 
socket.on("user-connected",(socket_name)=>{
  userjoinleft(socket_name,'joined');
  //console.log(socket_name)
})

//user left krega jb ya function call ho ga
socket.on("user-disconnected",(socket_name)=>{
    userjoinleft(socket_name,'left');
})

// user list OR count
socket.on("member_list",(users)=>{
    let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

    user_list.innerHTML = "";
    user_arr =Object.values(users);
    for (let i = 0; i < user_arr.length; i++) {
       
        li = document.createElement("li");
        li.classList.add("left");
        li.classList.add("clearfix");
        li.innerHTML = ` <span class="chat-img pull-left">
        <img src="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg" alt="User Avatar" class="img-circle">
        </span>
        <div class="chat-body clearfix">
           <div class="header_sec">
              <strong class="primary-font">${user_arr[i]}</strong> <strong class="pull-right">
              ${date + "-" + month + "-" + year}</strong>
           </div>
           <!---<div class="contact_sec">
              <strong class="primary-font">(123) 123-456</strong> <span class="badge pull-right">3</span>
           </div>--------->
        </div>`;
        user_list.appendChild(li);
    }
    user_count.innerHTML = user_arr.length;

})

//user send a msg for client to server || server to client
user_msg_btn.addEventListener('click',()=>{
           
        let  data = {
                // id:socket.id,
                name:username,
                msg:user_msg.value
             }
    
      if (user_msg.value !='') {
        user_li(data,"baseRight");
        socket.emit("msg",data);
       
        user_msg.value = "";
      }   

})

socket.on("msg",(data)=>{
     user_li(data,"baseLeft");
})
// function msg append right/left
function user_li(data,status){
    let li = document.createElement("li");
      li.classList.add("messageLI");
       if (status == "baseRight") {
      // li.classList.add("msgRight");
         li.innerHTML = ` 
                             <span class="nameChat ${status}" > 
                            ${data.name}
                             </span>
                             
                             <div class="message ${status}">
                             <p style='color:#ccc; margin:0px 10px'><b>${data.name}</b></p>
                                <p>${data.msg}</p>
                                <!---<div class="chat_time pull-right">09:40PM</div>--->
                             </div>
                             <br clear='all'>
                         `;
                     }else{
      li.classList.add("msgRight");

        li.innerHTML = `      <span class="nameChat ${status}" style="margin:7px 0; ">
                            ${data.name}
                             </span>
                             <div class="message ${status} ">
                               <p style='color:#ccc; margin:0px 10px'><b>${data.name}</b></p>
                                <p>${data.msg}</p>
                                <!---<div class="chat_time pull-right">09:40PM</div>--->
                             </div>

                            
                             <br clear='all'>
                         `;
                     }
   user_chat_UL.appendChild(li);
 }


// function   user left or Join  and  show name status 
function userjoinleft(name,status=false){
   let li = document.createElement("li")
   li.classList.add("chat-join");
   let content = `    ${name} ${status} the chat   `;

    li.innerHTML = content;
    user_chat_UL.appendChild(li);
}





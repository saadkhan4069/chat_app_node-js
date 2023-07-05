   // var orderId = document.getElementById("orderId");
   // var userId  = document.getElementById("userId");
   // if (orderId.value !="" && userId.value !="" ) {
            

   // }


const socket = io();

  var username;
   var chats = document.querySelector(".userjoinleft");
   var user_list = document.querySelector(".member_name");
   var user_count = document.querySelector(".list_count");
   var user_chat_UL = document.querySelector(".user_chat_area");
   var user_msg = document.querySelector("#user_msg");
   var user_msg_btn = document.querySelector("#user_msg_btn");
   var userName = document.querySelector("#userName");
   var orderId = $("#orderId").val();
   var userId = $("#userId").val();
   value2 = userName ? userName.value : prompt("Enter Your Name");

do{

    username = value2;
}while(!username);

socket.emit("new-user-joined",{"username":username,"userId":userId,"orderId":orderId});

// user connect 
socket.on("user-connected",(socket_name)=>{

  // userjoinleft(socket_name,'joined');
})

//user left krega jb ya function call ho ga
socket.on("user-disconnected",(socket_name)=>{
    // userjoinleft(socket_name,'left');
})

// user list OR count
// socket.on("member_list",(userKaName)=>{
//     let ts = Date.now();
// let date_ob = new Date(ts);
// let date = date_ob.getDate();
// let month = date_ob.getMonth() + 1;
// let year = date_ob.getFullYear();

//     user_list.innerHTML = "";
//     user_arr =Object.values(userKaName);
//     // user_key=Object.keys(userKaName);
//     // user_arr =userKaName.username;
    
//       if (user_arr.includes(orderId)) {
 
   
//     for (let i = 0; i < user_arr.length; i++) {
        
//       if (user_arr[i] == orderId) {
//           li.classList.add("active");
//       }
//        // if(user_key[i] ==  userId){
//         li = document.createElement("li");
//         li.classList.add("left");
       
//         li.innerHTML = ` <span class="chat-img pull-left">
//         <img src="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg" alt="User Avatar" class="img-circle">
//         </span>
//         <div class="chat-body clearfix  ">
//            <div class="header_sec">
//              <strong class="primary-font"> <a href='https://demo.leatherstrend.com/test/${userId}/${user_arr[i]}/${userName.value}' target='_blank'> ${user_arr[i]}</a></strong> 
//               <!---<strong class="pull-right">
//               ${date + "-" + month + "-" + year}</strong>--------->
//            </div>
//            <!---<div class="contact_sec">
//               <strong class="primary-font">(123) 123-456</strong> <span class="badge pull-right">3</span>
//            </div>--------->
//         </div>`;
//         user_list.appendChild(li);
//        // }
//     }
//     user_count.innerHTML = user_arr.length;
//     }
   
// })

//user send a msg for client to server || server to client
   $(user_msg_btn).click(function(){
    
        var emps = [];
        var empsName = [];
        $.each($("#userShow option:selected"), function(){            
            emps.push($(this).val())
            empsName.push($(this).text())
        });
       
        
    // alert("You have selected the country - " + emps.join(", "));
        let  data = {
                // id:socket.id,
                name:username,
                msg:user_msg.value,
                emps:emps,
                empsName:empsName.join("-"),
                userId:userId,
                orderId:orderId
                
             }

   
      if (user_msg.value !='' ) {
         
        socket.emit("msg",data);
   if ( data.orderId == orderId  ) {

        user_li(data,"baseRight");    
      }
        user_msg.value = "";
        $("#userShow option:selected").prop("selected", false)
      }   
    
    

})
  $(document).ready(function() {
            $("#user_msg_btn").click(function() {
               
               var myList = document.querySelector(".chat_area");
                myList.scrollTop = myList.scrollHeight;
                
            });
        });
socket.on("msg",(data)=>{
    if ( data.orderId == orderId  ) {
     user_li(data,"baseLeft");
      
    
    
        
 }
})
// function msg append right/left
function user_li(data,status){

    let li = document.createElement("li");
      li.classList.add("messageLI");
        em = "";
      
         
       if ( data.empsName != "") {  
        empname =     data.empsName.split("-");
       for (var i = 0; i < empname.length; i++) {
      
        em += "<span class='badge badge-primary'>@"+empname[i]+"</span><br>";
       
       }
     
         }
       
      
       if (status == "baseRight") {
      // li.classList.add("msgRight");
         li.innerHTML = ` 
                             <span class="nameChat ${status}" > 
                            ${data.name}
                             </span>
                             
                             <div class="message ${status} ">
                             <p style='color:#ccc; margin:0px 10px'><b>${data.name}</b></p>
                                <p>${data.msg}</p>
                                <!---<div class="chat_time pull-right">09:40PM</div>--->
                             `+em+`
                             </div>
                            
                             <br clear='all'>`;
                     }else{
      li.classList.add("msgRight");

        li.innerHTML = `      <span class="nameChat ${status}" style="margin:7px 0; ">
                            ${data.name}
                             </span>
                             <div class="message ${status} ">
                               <p style='color:#ccc; margin:0px 10px'><b>${data.name}</b></p>
                                <p>${data.msg}</p>
                                <!---<div class="chat_time pull-right">09:40PM</div>--->
                            `+em+`
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



$(document).ready( function() {

// var mytextbox = document.getElementById('user_msg');
// var mydropdown = document.getElementById('userShow');

//   mydropdown.onchange = function() {
//   var user_msg_id = mydropdown.options[mydropdown.selectedIndex].value;
//   var user_msg_text = mydropdown.options[mydropdown.selectedIndex].text;
 
//   mytextbox.value = mytextbox.value + ' ' + user_msg_text;
// }
memberList();
ViewMesg();
GetSearchUser();
});

 
 function ViewMesg(){
     orderId =  $("#orderId").val();
     userId  =  $("#userId").val();

    fData = "";
     
       s = call_ajax("GET","../../../ViewMsg/"+orderId,fData);
          s.done(function(data) {
           if (data !="") {
            htm2 = ``;   
            $(data).each(function(a,b){
                   tg = "";
                   if ( b.tags_name != "") {

                     tagName =  b.tags_name.split("-"); 
                  for (var i = 0; i < tagName.length; i++) {
                      
                tg += `<span class='badge badge-primary'>@`+tagName[i]+`</span><br>`;
                   }
           
                  }
              if (b.messages.includes("to this conversation")) {

               htm2 +=   `<li class='chat-join'>${b.messages}</li>`;
               
              }else{

             
              if (b.sender_id == userId) {
            htm2 +=   `  <li class='messageLI'>
                         <span class="nameChat baseRight" style="margin:7px 0; ">
                            ${b.sender_name}
                             </span>
                             <div class="message baseRight ">
                               <p style='color:#ccc; margin:0px 10px'><b>${b.sender_name}</b></p>
                                <p>${b.messages}</p>
                                <!---<div class="chat_time pull-right">09:40PM</div>--->
                            `+tg+`
                             </div>
                             <br clear='all'>
                              </li> `;
              }else{
                   htm2 +=  ` <li class='messageLI'>
                             <span class="nameChat baseLeft" > 
                            ${b.sender_name}
                             </span>
                             
                             <div class="message baseLeft ">
                             <p style='color:#ccc; margin:0px 10px'><b>${b.sender_name}</b></p>
                                <p>${b.messages}</p>
                                <!---<div class="chat_time pull-right">09:40PM</div>--->
                            `+tg+`
                             </div>
                            
                             <br clear='all'>
                             </li>`;
                  }
              }

            });
             $(".user_chat_area").append(htm2)
           }         
          }); 

 }


function GetSearchUser(){
      
        val =  "val";

    fData = "";
     
       s = call_ajax("GET","../../../GetEmployee/"+val,fData);
          s.done(function(data) {
           htm = "";
           htm += "<option value='' disable  ><b>Select Employee</b></option>";

           $(data).each(function(k,v){

           htm += `<option value='`+v['id']+`' >`+v['first_name']+`  `+v['last_name']+`</option>`;

           })

           $("#userShow").html(htm)
          htm = "";
          }); 
     
}



function memberList(){
      // ya function is liye banaya hai t kay har person ko os k order dikh skaye   
        val =  $("#userId").val();
     let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
         fData = "";
         member = '';  
       

       s = call_ajax("GET","../../../member_list/"+val,fData);
          s.done(function(data) {
           if (data =="") {
             member+=`  <li class='left  '> <span class="chat-img pull-left">
        <img src="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg" alt="User Avatar" class="img-circle">
        </span>
        <div class="chat-body clearfix  ">
           <div class="header_sec">
             <strong class="primary-font"> <a href='https://demo.leatherstrend.com/test/${userId}/${orderId}/${userName.value}' target='_blank'> ${orderId}</a></strong> 
              <!---<strong class="pull-right">
              ${date + "-" + month + "-" + year}</strong>--------->
           </div>
           <!---<div class="contact_sec">
              <strong class="primary-font">(123) 123-456</strong> <span class="badge pull-right">3</span>
           </div>--------->
        </div>`;
      }else{
            $(data).each(function(k,v){
              if (v['order_id'] !="") {
         active = "";
        
         active = "active";
          }

          member+=`  <li class='left  ${active}'> <span class="chat-img pull-left">
        <img src="https://icon-library.com/images/avatar-icon-png/avatar-icon-png-25.jpg" alt="User Avatar" class="img-circle">
        </span>
        <div class="chat-body clearfix  ">
           <div class="header_sec">
             <strong class="primary-font"> <a href='https://demo.leatherstrend.com/test/${userId}/${v['order_id']}/${userName.value}' target='_blank'> ${v['order_id']}</a></strong> 
              <!---<strong class="pull-right">
              ${date + "-" + month + "-" + year}</strong>--------->
           </div>
           <!---<div class="contact_sec">
              <strong class="primary-font">(123) 123-456</strong> <span class="badge pull-right">3</span>
           </div>--------->
        </div>`;
           

            });
         }
        $(user_list).append(member);
          }); 
     
}



function call_ajax(method,url,data){
       
   
  return   $.ajax({
    url: url,
    type : method,
    dataType:'json',
  data:  data,
   });
}



// change color for all user uniqe color

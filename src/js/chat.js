"use strict"

const socket = io();

const nickname = document.querySelector(".nickname");
const chatlist = document.querySelector(".chatting-list");
const chatinput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click",()=>{
    const param={
        name:nickname.value,
        msg:chatinput.value,
    }
    socket.emit("chatting",param);//socket.emit(서버로 보낼 이벤트명,데이터);
})

socket.on("chatting",(data)=>{
    const chatli = document.createElement("li");
    chatli.innerText=`${data.name} 님이 - ${data.msg}`
    chatlist.appendChild(chatli);
})

console.log(socket);

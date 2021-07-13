"use strict"

const socket = io();

const nickname = document.querySelector(".nickname");
const chatlist = document.querySelector(".chatting-list");
const chatinput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatinput.addEventListener("keypress",(event)=>{
    if(event.keyCode===13)
    {
        send()
        chatinput.value=""
    }
})

function send(){
    const param={
        name:nickname.value,
        msg:chatinput.value,
    }
    socket.emit("chatting",param);//socket.emit(서버로 보낼 이벤트명,데이터); 클라이언트에서 서버로 요청을 보낼때 .emit 메소드를 사용
    chatinput.value=""
}

sendButton.addEventListener("click",send)

socket.on("chatting",(data)=>{ //서버에서 클라이언트로 받아올때 사용
    const {name,msg,time}=data; //구조분해 할당
    const item = new LiModel(name,msg,time);
    item.makeLi()
    displayContainer.scrollTo(0,displayContainer.scrollHeight)
})

function LiModel(name,msg,time){
    this.name = name;
    this.msg = msg;
    this.time = time;
    this.makeLi=()=>{
        const chatli = document.createElement("li");
        chatli.classList.add(nickname.value === this.name ? "sent":"received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https://placeimg.com/50/50/any" alt="any">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`
    chatli.innerHTML= dom;
    chatlist.appendChild(chatli);
    }
}

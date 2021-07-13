const express = require("express") //require를 쓰게되면 자동적으로 nodeModules를 보게됨으로써 따로 경로 지정 안해도됌
const http = require("http"); //Node.js 기본 모듈인 http를 불러옴
const app = express(); //express를 실행한 내용을 app에 담음
const path = require("path");//경로 지정
const server = http.createServer(app); //express가 실행된 app을 http를 통해서 실행될수 있도록 선언
const socketIO = require("socket.io");//socket.io 를 불러옴
const moment = require("moment");
const io = socketIO(server);
app.use(express.static(path.join(__dirname,"src"))) //해당 앱의 실행 경로는 src 폴더 안에 있는 index.html 폴더
//path.join 을 사용하는 이유는 운영체제 마다 경로를 나타내주는 '/' 가 다르기 때문에
const PORT = process.env.PORT || 5000;//서버를 실행하기 위해서 PORT가 필요


io.on("connection",(socket)=>{ //클라이언트에서 해당 데이터를 받을때는 on 이라는 메소드로 받아옴
    //연결이 이루어 졌을때 연결에 대한 정보나 모든것들을 socket 에 넣어둠
    socket.on("chatting",(data)=>{
        const{name,msg}=data;
        io.emit("chatting",{ //클라이언트에서 받은 요청을 서버에서 다시 클라이언트로 보냄
            name,
            msg,
            time:moment(new Date()).format("h:mm A")
        })
    })
})

server.listen(PORT,()=>console.log(`server is running${PORT}`))//서버를 실행하는 메소드 .listen

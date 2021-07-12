const express = require("express") //express를 변수안에 기입
const http = require("http");
const app = express(); //express를 실행한 내용을 APP에 담음
const path = require("path");//경로 지정
const server = http.createServer(app);
const socketIO = require("socket.io");

const io = socketIO(server);

app.use(express.static(path.join(__dirname,"src"))) //해당 앱의 실행 경로는 src 폴더 안에 있는 index.html 폴더
const PORT = process.env.PORT || 5000;

io.on("connection",(socket)=>{
    consonle.log("연결이 이루어졌습니다");
})

console.log("연결됌");
server.listen(PORT,()=>console.log(`server is running${PORT}`))//요청을 받으면 콘솔로크 포트번호 출력

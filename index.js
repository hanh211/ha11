var cv=require('opencv4nodejs')
var path=require('path');
var express=require("express");
var app=express();
var server=require('http').Server(app);
var io=require('socket.io')(server);
var wCap = new cv.VideoCapture("rtsp://admin:admin1234@ngduchanh3.ddns.net:554/cam/realmonitor?channel=1&subtype=0");

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
});
setInterval(()=>{
  var frame=wCap.read();
  var image=cv.imencode('.jpg',frame).toString('base64');
  io.emit('image',image);
},1000);

server.listen(process.env.PORT || 3000);

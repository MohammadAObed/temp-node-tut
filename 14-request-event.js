const http = require('http')

// const server = http.createServer((req,res)=>{
//     res.end('Welcome');
// }) 

// Using Event Emitter API 
const server = http.createServer();
// (emits 'request' event) behind the scenes, server.emit('request',req,res)....
// subscribe to it / listen for it / respond to it / whatever you wanna call it
server.on('request', (req,res)=>{
    res.end('Welcome');
});

server.listen(5000);
const http = require('http');

const server = http.createServer((re,res) => {
    console.log('request event');
    res.end('hello world');
}); //obviuously you create a server after you are listening on a port, so thats why console logging (server listeneing on port : 5000...) comes first in the terminal

server.listen(5000, () => {
    console.log('server listeneing on port : 5000...');
});  //listen method is asynchronous, but its just when we are setting up the server, thats why its executing first in the terminal




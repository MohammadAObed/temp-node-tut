const http = require('http');

//the parameters are objects
//req represents incoming requests, imagine the client is requesting from the web browser your webpage, so you have useful info in the req object
//res (response), is what we are sending back
const server = http.createServer((req,res)=>{

    //find what page user is requesting
    if(req.url === '/'){
        res.end('Welcome to our home page');
    }
    if(req.url === '/about'){
        res.end('Here is our short history');
    }
    res.end(`<h1>Oops!</h1><p>We can't seem to find the page you are looking for</p><a href="/">Back Home</a>`);
});

server.listen(5000);

//web servers keep on listening to requests, you want them always to be up.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    // const text = fs.readFileSync('./content/big.txt','utf8')
    // res.end('Hello World!'); //bad bad method

    const fileStream = fs.createReadStream('./content/big.txt','utf8');
    fileStream.on('open',()=>{
        fileStream.pipe(res); //connect readable stream to writable stream, stream read data in chunks, then we can write them from those chunks as well, under the hood the response object can be setup as a writable string or stream
    });
    fileStream.on('error',(err)=>{
        res.end(err);
    });
});

server.listen(5000);

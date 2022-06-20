//streams in nodejs
//is the ability to read or write sequentially, working with streaming data
//types of streams: writeable, readable, duplex, transform
//many built-in modules use streaming interface
//stream also extends eventemitter

//a good use case to use streams when reading a file
//in reading files, the approach we used before if the file to read is too big, well, a variable cannot store all of it and it will start to throw errors for variious stuff.

const {createReadStream} = require('fs');

const stream = createReadStream('./content/big.txt', {
    highWaterMark: 90000,
    encoding: 'utf8'
});

// default 64kb
// last buffer - reminder
// const stream =  createReadStream('./content/big.txt', {higherWaterMark: 90000}); -control the size of buffer (90kb)
// const stream = createReadStream('./content/big.txt', {encoding:'utf8'});

stream.on('data',(result)=>{
    console.log(result); //reading data in chunks (chunks: default:64kb, or custom by higherWaterMark value)
});

stream.on('error',(err)=>{
    console.log(err);
});
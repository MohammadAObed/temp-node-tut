//fs: interact with filesystem
//async: non-blocking, sync: blocking
//ofcourse async is better 

// sync
const {readFileSync,writeFileSync} = require('fs'); 
// const fs = require('fs');
// fs.readFileSync();
console.log('start');
//(path,encoding (utf))
const first = readFileSync('./content/first.txt','utf8');
const second = readFileSync('./content/second.txt','utf8');

// console.log(first,second);

//filename, if its not there then node will create that file
//(filename,contentOfFile,optionsObj)
writeFileSync('./content/result-sync.txt',`here is the result:  ${first}, ${second}`, {flag:'a'});
//flag: 'a' means append content or else it will override the original content

console.log('done with this task');
console.log('starting the next one');
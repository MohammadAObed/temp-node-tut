//async (better suited for most cases)
const {readFile, writeFile} = require('fs');

console.log('start');
//(path,encode,callback) (callback must have this if statement)
readFile('./content/first.txt','utf8',(err,result)=>{
    if(err) {
        console.log(err);
        return;
    }
    const first = result; //read first file

    readFile('./content/second.txt','utf8',(err,result)=>{
    if(err) {
        console.log(err);
        return;
    }
    const second = result; //read second file

    writeFile('./content/result-async.txt',
    `Here is the resulteee : ${first}, ${second}`,
    {flag:'a'}, (err,result)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log('done with this task');
        
    });
    });
});

console.log('starting next task');
//this means that you can for example click a button or do anything while doing an async task

//you realize that async tasks are done without blocking or freezing other code, other code executes while the async task is being executed
//ex run this file code to see the console logs

//replacement for this callback nesting hell above, u can use promises, async await
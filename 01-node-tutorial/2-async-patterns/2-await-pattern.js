const { start } = require('repl');

const {readFile, writeFile} = require('fs').promises;
// const util = require('util')
// const readFilePromise = util.promisify(readFile)
// const writeFilePromise = util.promisify(writeFile)

const start = async () => {
  try {
    const first = await readFile('./content/first.txt', 'utf8') //these await lines gets back the result in (then or catch) of promise that is has (reject or resolve)
    const second = await readFile('./content/second.txt', 'utf8')
    await writeFile(
      './content/result-mind-grenade.txt',
      `THIS IS AWESOME : ${first} ${second}`,
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()

// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, 'utf8', (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data)
//       }
//     })
//   })
// }
// getText('./content/first.txt')
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err))


//========================================================================================================
//below is my code, just comment it out

// const {readFile,writeFile} = require('fs').promises;

// //the .promises above is cleaner
// // const util = require('util');
// // const readFilePromise = util.promisify(readFile);
// // const writeFilePromise = util.promisify(writeFile);

// //the util code above is cleaner
// // const getText = (path)=>{
// //     return new Promise((resolve,reject)=>{  
// //         readFile(path,'utf8',(err,data)=>{
// //             if(err){
// //                 reject(err);
// //             }else{
// //                 resolve(data);
// //             }
// //         }); 
// //     });
// // };

// // getText('./content/first.txt')
// // .then(result=>console.log(result))
// // .catch(err => console.log(err));

// //so using promises to reuse the readfile async code, by creating a method that returns a new promise, then invoking the method and then chaining (then and catch) to the invokation becuase it returns a new promise (because for example each readfile request requires a new promise)

// //Refactor to async
// //if i also want to use writefile async method then its still going to be pain,
// //sln: since we are returning a promise, if i use async await, i can wait till promise is settled then decide whatever i want
// //set this up by creating a new function
// //now throughout the course, the functions we are setting up below will be provided to us by libraries, so we will just async to the callback function provided by those libs

// const start = async () =>{
//     try {
        
//         const first = await readFile('./content/first.txt', 'utf8');
//         const second = await readFile('./content/second.txt', 'utf8');

//         //above is cleaner
//          // const first = await readFilePromise('./content/first.txt', 'utf8');
//         // const second = await readFilePromise('./content/second.txt', 'utf8');

//         //above is cleaner
//         // const first = await getText('./content/first.txt'); //so await here basically allowing to get the resolve or reject and assign it to first. (so its like then and catch: getText('./content/first.txt').then(result=>const first=result;console.log(first);)
//         // const second = await getText('./content/second.txt');

//         // await writeFilePromise('./content/result-mind-grenade.txt',`THIS IS AWESOME : ${first} , ${second}`);

//         await writeFile('./content/result-mind-grenade.txt',`TTHIS IS AWESOME : ${first} , ${second}`, {flag: 'a'});

//         console.log(first,second);
        

//     }catch(error) {
//         console.log(error);
//     }
// }

// start();

setInterval(() => {
  console.log('hello world')
}, 2000) //every two seconds event loop will invoke that callback
console.log(`I will run first`)
// process stays alive unless
// Kill Process CONTROL + C
// unexpected error

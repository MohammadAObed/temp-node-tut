
// started operating system process
console.log('first');
setTimeout(() => {
    console.log('second');
},0); //even if its 0, we wait for all the rest of code, bcz its async, so it gets offloaded, back of the line
console.log('third');
// completed and exited operating system process

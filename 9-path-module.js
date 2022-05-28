//path module, interact with paths easily
const path = require('path');

console.log(path.sep);

const filePath = path.join('./content','subfolder','test.txt');

console.log(filePath);

const base = path.basename(filePath);
console.log(base);

//(IMPORTANT! will be used bcz it gets directory in any user device) absolute path (path from hard disk to wanted file) 
const absolute = path.resolve(__dirname,'content','subfolder','test.txt');
console.log("dirname: ",__dirname);
console.log("absolute: ",absolute);
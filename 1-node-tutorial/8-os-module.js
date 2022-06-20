//OS Module, for interacting with os and the server

const os = require('os');

// info about current user
const user = os.userInfo();
console.log(user);

// method returns the system uptime in seconds (100 seconds not 60)
console.log(`The system uptime is ${os.uptime} seconds`);

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freMem: os.freemem(),
}

console.log(currentOS);
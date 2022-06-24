// Modules

//you will execute 1 file, but you will split your code into modules, or else it would be insane.

// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./4-names');
const sayHi = require('./5-utils');
const data = require('./6-alternative-flavor');

// when you import a module you actually invoke it (invoke code that is invokable)
require('./7-mind-grenade');

sayHi('susan');
sayHi(names.john);
sayHi(names.peter); 

console.log(data.items,data.singlePerson);
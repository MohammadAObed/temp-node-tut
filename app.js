//npm world's biggest code store
//npm - global command, comes with node
//npm --version

//local dependency - use it only in this particular project
//npm i <packageName>

//global dependency - use it in any project
//npm install -g <packageName>
//sudo npm install -g <packageName> (mac)

//more often is locally dependency

//we still miss one thing:
//package.json -manifest file (stores inportant info about project/package)
// manual approach 
// npm init (step by step, press enter to skip)
// npm init -y (everything default)

//package.json: has info about our project, and has our dependencies

const _ = require('lodash');

const items = [1, [2, [3, [4]]]];

const newItems = _.flattenDeep(items);

console.log(newItems);
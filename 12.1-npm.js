//this file is important

//npm world's biggest code store
//npm - global command, comes with node
//npm --version

//local dependency - use it only in this particular project
//npm i <packageName>

//global dependency - use it in any project, most are for dev dependencies
//npm install -g <packageName>
//sudo npm install -g <packageName> (mac)

//more often is locally dependency

//we still miss one thing:
//package.json -manifest file (stores inportant info about project/package)

// manual approach 
// npm init (step by step, press enter to skip)

// npm init -y (everything default)

//package.json: has info about our project, and has our dependencies

//after installing a dependency, a folder named node_modules is created and the dependencies are installed there, whit package.json and -lock containing info about that dependency

const _ = require('lodash');

const items = [1, [2, [3, [4]]]];

const newItems = _.flattenDeep(items);

console.log(newItems);
console.log("hello people");

// after we push everything to github (linked github repo with this repo (it tells you when you create a repo in github the commands) then added, commited, pushed), .gitignore means ignore files typed inside it, so node_modules are ignored, so How people viewing your github repo will know which modules used???

//people viewing github repo and maybe cloning the repo will get the package.json which includes the dependencies (mdoules) to include, so they just type in terminal: npm install 

//ex: using react (you dont share modules folder)

//Always, install the node dependency (which saves you from always typing node in terminal) (its called dev dpendency) so type:
//npm i packageName -D //or --save-dev (ex packageName: nodemon)

//its called dev dependencies because you use it for yourself as a dev, for production, also you could also use other better dependencies

//now inside package.json: use scripts to make shortcuts to terminal commands (then in terminal type npm customCommandName) ex start (some times it's npm run customeCommandName)

//in package.json type in scripts: "dev": nodemon app.js //like live server (type it one time to start it) then the terminal will keep updating and running your file in terminal
//press ctrl c to stop

//1-uninstall: npm uninstall packageName //(ex: bootstrap)

//2-there is another approach (where you delete package-lock.json and other stuff...) return to youtube if you need it)

//---------------------------------------------------------
//install globally
//like nodemon
//install it in the terminal,
//go to gitbash 
//npm install -g nodemon

//watch rest of the video where react and other frameworks will tell you to do something that doesn't require to install something globally... (npx route)

//global dependency has changed, unsing npx (go to use react by npx to see how to do it) (use local terminal not global to use npx)

//package-lock json
//in package json we can see that dependencies have versions, and some dependenices has other dependencies which they also have versions

//for example who get your project, you want them to have your same exact setup becuase things and versions gets updated and changed which leeds to bugs

//package lock.json you have specific versions for all dependencies and pacjages that each dependency use

//ex: look at this depend below 
//"lodash": "^4.17.21"
// 4: major change (breaking change)
//17: minor changes (backward compatible) //its ok if not same
//21: so if this changes no big deal //its ok if not same

//look for google and watch basics of package.json, (nodesource.com)
//all course slides available on course-api.com

Shortcuts:
terminal: ctrl `, 

Inside terminal: clear, arrow up, 

NodeJS

-Enviroment to run JS outside Browser

- Built on Chrome's v8 JS Engine

- Big Community

- Full-Stack

Browser         Node.js

DOM                 No DOM
Window              No Window
Interactive Apps    Server-side Apps
No Filesystem       Filesystem
Fragmentation       Versions
ES6 Modules         CommonJS

How do we get node to evaluate our code.
 REPL (dont use it! just for fun)

 CLI executable (run our app code in node) 

to run node code: 
 in cmd: cd (dir) node app.js 

 ctrl `
 or in vs code terminal, just create a new terminal, type node example.js

remember: built-in modules has alot of methods, and most of them not covered here, so:
 for anything wasn't covered or you wanted in node.js (like modules functions and props), just go to the docs of node.js, go to your lte version.


 all of our work in http and after will revolve in some shape or form around server setup, aka http module

 -------------------------------------------------------------------------------------------------------------------------------------------------
 --------------------------------------------------------------------------------------------------------------------
 imagine you want a slider in ur website, u can build one from scratch or copy and paste a ready one.
 someone else may had the same issue so he built the slider and shared it, so with npm u got through the doc, and with one command you can add the slider to your website.

 npm (node package manager)
 1- reuse our own code in other projects
 2- use other code written by other devs
 3- share our slns with other devs

 -you can find useful functions to full frameworks, u can get react with npm,

 in a typical node project, we will have few npm packages installed as dependencies.

 reusable code: a package (or module or dependencies), folder contain js code.

 most of time you have to sniff out or delete the useless packages (packages u wont use) that comes with the whole package u use.


 //all course slides available on course-api.com

//event loop: is what allows node.js non-blocking io operations despite the fact that javascript is single-threaded by offloading information to the system kernal whenever possible.

// google:nodejs.dev event loop explanation
// youtube: morning keynote- everything nodejs event loop

//event loop: offloading operations to the system kernal whenever possible

//event loop: if 7 users using the system, one user named larry requested something time consuming, other users have to wait for larry's operation to be complete for them to use the system
//event loops take larry's operation, the task of requesting something is being offloaded, and then when the task is complete we execute the callbak function we provided after that task, and the other users can use the system even while the task is being performed,
//a note is when setting timeout value, like 5 sec, if if the immediate code (the code not related to the task) takes more than 5 seconds, then the callback function of our task will execute at the end line after the immediate code

//
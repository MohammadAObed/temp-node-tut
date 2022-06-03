//all course slides available on course-api.com

//event loop: is what allows node.js non-blocking io operations despite the fact that javascript is single-threaded by offloading information to the system kernal whenever possible.

// google:nodejs.dev event loop explanation
// youtube: morning keynote- everything nodejs event loop

//event loop: offloading operations to te system kernal whenever possible

//event loop: if 7 users using the system, one user named larry requested something time consuming, other users have to wait for larry's operation to be complete for them to use the system
//event loops take larry's operation, the task of requesting something is being offloaded, and then when the task is complete we execute the callbak function we provided after that task, and the other users can use the system even while the task is being performed,
//a note is when setting timeout value, like 5 sec, if if the immediate code (the code not related to the task) takes more than 5 seconds, then the callback function of our task will execute at the end line after the immediate code



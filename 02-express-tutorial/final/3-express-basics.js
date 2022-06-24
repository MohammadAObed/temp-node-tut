//go to expressjs docs to learn more about it
// express: minimal and flexable nodejs web app framewroks, designed to make development web apps and apis much easier
//express is a standard even if its not built in node.

const express = require('express');
const app = express(); //similar to const server = createserver()...

//everytime the user performs a GET request to the server on our domain
app.get('/',(req,res)=>{
    console.log('user hit the resource');
    res.status(200).send('Home Page');
});

//about page
app.get('/about',(req,res)=>{
    res.status(200).send('About Page');
})

//user can do multiple things on a server so all method is used
//404
app.all('*',(req,res)=>{
    res.status(404).send('<h1>resource not found</h1>'); //status for status code
});

app.listen(5000,()=>{
    console.log('server is listening on port 5000');
});

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.use
// app.listen


//the http methods, get post,put,delete are http verbs, http request & response messages, what we look in req message is the http verb.
//Remember: this represent what the user tryna do

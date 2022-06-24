const express = require('express');
const path = require('path');

const app = express();
//create a folder named public, and move all your static files into it.
app.use(express.static('./public')); //setup static and middleware, dont worry it will be explained later on
// static asset means that its a file that the server doesn't have to change, because its true. Common name for the static folder is public or static
//if you're confused, such as the term javascript means make my website dynamic,then its true, but it makes it dynamic in a browser, as far as servers is concerned javascript file is just an asset that doesn't need to change.
//but there is dynamic stuff, like a user wanna login, then we want to display his name in the html home page, later learned.


// app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'./navbar-app/index.html')) //absolute path
// }) 
//dont use the method above for html files or any static assets (static files)
//way number1: dumb static assets including htmls in the static or public folder
//way number2: SSR (server-side rendering): using templating engine, covered later on 

app.all('*',(req,res)=>{
    res.status(404).send('resource not found')
})

app.listen(5000,()=>{
    console.log('port is listening to port 5000...');
});


//you can simply just dumb everything static in public if you are in a hurry, everything will work just fine.
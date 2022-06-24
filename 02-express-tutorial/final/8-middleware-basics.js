// middleware in express
//they are functions that execute during the request of the server
//they has access to request and response objects
//functionality: sky is the limit.

//middleware is everywhere in express, express can be bunch of middleware that makes the cake, you cant skip it.

const express = require('express');
const app = express();

// req => middleware => res
const logger = (req,res,next) =>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method,url,time);
    next();
}

//MUST DO!!: when you work with middleware, you MUST pass it on to a next middleware or (could be the app.get() app.method() or etc...) by using next().

//home page route
app.get('/',logger,(req,res)=>{
    
    res.send("Home")
})

//about page route
app.get('/about',logger,(req,res)=>{
    res.send("About")
})



app.listen(5000,()=>{
    console.log("server is listening on port 5000....");
})
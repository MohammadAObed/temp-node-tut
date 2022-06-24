//authorize middleware is only for demonstration 
const express = require('express')
const app = express()

const logger = require('./logger');
const authorize = require('./authorize');

// req => middlware => res

app.use([logger,authorize]); //invoke the methods to every route (app.get, app.post, etc...), the order of methods inside app.use matters, first ones get executed
//Note: order matters, place it above where you want to add the logger method to

//or add to spesific routes
// app.use('/api',logger) //api and any descendent routes (ex /api/products) will have logger
//app.use https://expressjs.com/en/4x/api.html#app.use


app.get('/',(req,res)=>{
    res.send('Home')
})

app.get('/about',(req,res)=>{
    res.send('About')
})

app.get('/api/products', (req,res)=>{
    res.send('Products')    
})


app.get('/api/items', (req,res)=>{
    console.log(req.user); //bcz we gave access by in authorize.js file
    res.send('Items')    
})

// app.get('/api/items', [logger,authorize],(req,res)=>{  give logger,authorize only for this route
//     console.log(req.user);
//     res.send('Items')    
// })

app.listen(5000,()=>{
    console.log("server is listening on port 5000....");
})

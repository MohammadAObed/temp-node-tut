//authorize middleware is only for demonstration 
const express = require('express')
const app = express()

const morgan = require('morgan'); //third party middleware, https://www.npmjs.com/package/morgan,  read the docs,
const logger = require('./logger');
const authorize = require('./authorize');
// req => middlware => res

// 1. use vs route //meaning give middlware directly in the route params, or in app.use  //espicially remember the descendents rule that the app.use apply to.
// 2. options (middlware) - our own (own middlware) / express (built-in middlware) / third party (ex: morgan) 

// app.use([logger,authorize]);  //give them to all routes
// app.use(express.static('./public')); //app.use is expecting middlware (in express we have a middlware called static)

app.use(morgan('tiny')); //gives morgan functionality to all routes, it console logs stuff like (status code, load time in ms)

//note, having multiple app.use for specific routes is allowed, last app.use will not override the previous ones

app.get('/',(req,res)=>{
    res.send('Home')
})

app.get('/about',(req,res)=>{
    res.send('About')
})

app.get('/api/products', (req,res)=>{
    res.send('Products')    
})


app.get('/api/items',(req,res)=>{
    console.log(req.user);
     res.send('Items')    
})

app.listen(5000,()=>{
    console.log("server is listening on port 5000....");
})

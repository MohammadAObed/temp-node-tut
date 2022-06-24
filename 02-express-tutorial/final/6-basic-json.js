//we may ommit (not type) stuff like status, etc... to save time, but we have to include them in serious  projects

const express = require('express');
const app = express();

const {products,people} = require('./data');

app.get('/',(req,res)=>{
    
    //response is send back json data (products)
    res.json(products); //https://expressjs.com/en/api.html#res.json
    //now that object can be accessed anywhere in the world
}) 


app.listen(5000,()=>{
    console.log('port is listening on port 5000...');
});
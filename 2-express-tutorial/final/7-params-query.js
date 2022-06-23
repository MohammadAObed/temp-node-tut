//stuff to remember: 1- put return in conditions, if for example u have to res.json in the same request, then express will get confused
//2- you will not set seperate urls for string queries, but for existing urls

const express = require('express');
const app = express();

const {products} = require('./data');

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1><a href="/api/products">Products</a>');
});

app.get('/api/products',(req,res)=>{
    const newProducts = products.map(product=>{
        const {id,name,image} = product;
        return {id,name,image};
    });
    res.json(newProducts);
});


//for pages like the page of each product, (amazon.com/products/1, .../2, .../3, ...) you use route parameter,
//productID: just a placeholder,REMEMBER! productID is a string, so convert it to number
app.get('/api/products/:productID',(req,res)=>{
    // console.log(req.params);
    const {productID} = req.params;

    const singleProduct = products.find(product => product.id === Number(productID));
    // const singleProduct2 = products.filter(product => product.id === Number(productID));
    // console.log(singleProduct,singleProduct2);
    if(!singleProduct) {
        return res.status(404).send('<h1>Product Does Not Exist</h1>')
    }

    return res.json(singleProduct);
});

app.get('/api/products/:productID/reviews/:reviewID',(req,res)=>{
    console.log(req.params); //req.params contain both productID and reviewID, so they could get more complex easilly
    res.send('hello world')
})

app.get('/api/v1/query',(req,res)=>{
    // console.log(req.query);
    const {search,limit} = req.query; //gets the key value pairs inside the req.query object
    let sortedProducts = [...products];

    //order matters here, the order below makes sense, first you search then limit
    //in url you can provide whatever, only search, only limit, both...
    if(search){
        sortedProducts = sortedProducts.filter(product => product.name.startsWith(search));
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,Number(limit));
    }

    if(sortedProducts.length < 1) {
        // res.status(200).send('no products matched your search');
        return res.status(200).json({success:true,data:[]}) //the object inside can be whatever i want
        //this means that page exist (nothing wrong with my url)(no 404 but 200) but nothing matched the query string params
    }

    res.status(200).json(sortedProducts); //doesn't matter if you include (return) or not cuz this is last line
    // res.send('hello world')
});

app.listen(5000,()=>{
    console.log("server listening on port 5000...");
});


//route params
//req.params: for like /products/1 , /products/2, product/:productID 

//query string params (url params):
//req.query: for like /products/query?search=a&limit=2
//send small info to the server using url.
//anything after the question mark is technically not part of the url
//keys are designed on server, value also on server, so we define them
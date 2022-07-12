
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config(); //will get the connectionstring (MONGO_URI) in .env file
const notFound = require('./middleware/not-found')
const errorHandlerMiddlware = require('./middleware/error-handler.js')
//middleware
app.use(express.static('./public'));
app.use(express.json());

//routes
app.use('/api/v1/tasks',tasks);

app.use(notFound) //for any route that does not exist
app.use(errorHandlerMiddlware);

// app.get('/api/v1/tasks')          -get all the tasks
// app.post('/api/v1/tasks')         -create a new task
// app.get('/api/v1/tasks/:id')      -get single task 
// app.patch('/api/v1/tasks/:id')    -update task
// app.delete('/api/v1/tasks/:id')   -delete task

//put vs patch
//put: replace existing document (so if you only want to update one property (ex:name) other properties will be removed as well, (maybe replaced with default values)) (in mongoose it doesn't allow that, but if you want (just provide the option: overwrite:true))
//patch: partial replace of the document (only desired props will be updated )

const port = process.env.PORT || 3000; //(host port, local port) in deployment, the host (the platform where the project is hosted, will set independelntly what port by whatever make sense to the platform)

const start = async () => { //bcz we said connectDB returns a promise
    try {
        await connectDB(process.env.MONGO_URI); //this will get the mongo_uri in .env. to connect us to database
        app.listen(port, console.log(`Server listening on port ${port}...`));
    } catch(error){
        console.log("YO!!!!!!:" + error);
    }
}

start(); //please dont forget to do this

//the structure of routes & controllers &..., Why?
//for REST API, its used for everything, we wanna create http interface, so other apps, especially mostly frontend ones can interact with our data.
//http verps, routes paths, data, 
//rest is a pattern. (so there is different patterns, but stick with one (consistent))
//note: get & post for same url are different requests for different scenarios
//crud: create,read,update,destroy (usual stuff performed by users and apps)
//rest allow users to perform curd on our data

//MongoDB
//NoSQL, NON Relational DB
//STORE JSON
//EASY TO GET STARTED
//FREE CLOUD HOSTING - ATLAS

//Store everything as json, doesn't care how data relates to each others, 
//instead of tables, we have collections (group of items). instead of rows, we have documents
//documents: consist of key value pairs, 
//data types: arrays objects, strings...

//cloud option: mongodb atlas


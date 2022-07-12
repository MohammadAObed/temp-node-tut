//mongoose docs, validation
//handle missing or incorret data from user, 

const mongoose = require('mongoose');
//schema is to provide the template or structure for the documents in a collection (like in sql database where each row has the same columms)
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'must provide name'], //will throw an error if empty string
        trim:true,
        maxlength:[20, 'name can not be more than 20 characters']
    }, //setting options,this is scratching the surface. there is more, some options are part of a thing called VALIDATION!!
    completed:{
        type:Boolean,
        default:false
    },
});
//only props you set in shcema will be taken from the req.body (other props are ignored).


//model is a representation of a collection, 
//(in mongoose: wrapper for the schema, provides interface to the database) using it we will be able to crud.

module.exports = mongoose.model('Task',TaskSchema) //Task: name of model
//use the module in controllers



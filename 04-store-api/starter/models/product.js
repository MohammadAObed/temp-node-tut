
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'must provide name!'],
    },
    price: {
        type:Number,
        required:[true, 'product price must be provided'],
    },
    featured: {
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt: {
        type:Date,
        default:Date.now() //so if someone not passing a value, then the current time is defult
    },
    company:{
        type:String,
        enum:{
            values: ['ikea','liddy','caressa','marcos'], //limit possible options
            message: '{VALUE} is not supported',
        }
        // or directly: enum:['ikea','liddy','caressa','marcos'], 
    },
})



module.exports = mongoose.model('Product',productSchema)
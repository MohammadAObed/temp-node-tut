

// will add all porudcts.json values to our database!! WOW! MASHA ALLAH. 
// so instead of adding through postman, you can do this instead!!!
// first create products.json and add the data to it, then do these steps

require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json') 

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) 
        await Product.deleteMany()  //delete all existing data
        await Product.create(jsonProducts) //4- create the data in database from the products.json
        console.log('Success!!!!!!!');
        process.exit(0) //terminate (like ctrl c), means everything went will (0)
    } catch (error) {
        console.log(error);
        process.exit(1) //means there is an error (1)
    }
}
//1- stop the server immediatly if running
start()

// now you have filled the database, you will need populate.js again in the project :)
// 6- terminate whole process

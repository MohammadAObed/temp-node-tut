const mongoose = require('mongoose') 

//!REMEMBER!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ALERT!!!!!: ALWAYS DO THE STUFF BELOW!
//.env file: if we push this up to github without .env file, everyone will get acces to the connectionstring, and can change my database
//sln: create .env file and put the connectionString inside it, then install dotenv package, then in .getignore, type '.env', then go to app.js to continue..

//database: consist of collections,
//collections (tables): group of documents 
//documents (rows);

//mongoose: package that is object data modeling property;
//it make our development faster, so install it with npm and use it

const connectDB = (url) => { //url is what we need to get access connect to database, the connectionstring (MONGO_URI value) is in .env file,
    return mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}) //returns a promise
} //we will invoke this function before the server listen

module.exports = connectDB;


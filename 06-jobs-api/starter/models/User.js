const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'please provided name!'],
        minlength:3,
        maxlength:50,
    },
    email: {
        type:String,
        required:[true, 'please provide email'],
        match: [ //to validate email
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please prvoide valid email',
        ],
        unique:true //so no two users shares same email (create a unique index, so when saving an existing email you will get duplicate msg
    },
    password: {
        type:String,
        required: [true, 'Please provide password'],
        minlength:6,
    },
})


//mongoose middleware docs
//pre: mongoose middleware will execute once we save the const user(document) in controller (before we res.json (send back a response)), then we access the user(document) by this keyword and hash the password in that user (document)
//similar code can be achieved in the controllers but to avoid crowding we did this here.
UserSchema.pre('save',async function(next){ //using function() instead of arrow function bcz we will use 'this' keyword
    const salt = await bcrypt.genSalt(10) //generate random bytes (10: random bytes we get, more is secure, but it will require more process power, 10 is default and very secure)
    this.password = await bcrypt.hash(this.password,salt) //this: will point to the document(const user in register controller)
    //next() not needed in newer versions of mongoose bcz we are using async/await
})



//mongoose instance metohds docs
//every document we created can have functions on them, (instances of our schema), so when user is created in that register controller, it will have a function,
//the code below is for explanation & reference & demo
UserSchema.methods.getName = function() {
    return this.name
}

// create a function that generates the token
UserSchema.methods.createJWT = function() {

    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET, { //https://www.allkeysgenerator.com/ for jwtsecret, encryption key 256bit 
        expiresIn:process.env.JWT_LIFETIME
    })
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword,this.password) //compare will compare correctly even if the password is hashed and candidate password is normal (not hashed)
    return isMatch
}

module.exports = mongoose.model('User',UserSchema)
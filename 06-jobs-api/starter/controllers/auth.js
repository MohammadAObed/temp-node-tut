const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


const register = async (req,res) => {

    const user = await User.create({...req.body}) //look in google for js object spread operator
    //the logic in UserSchema.pre will execute here... //this: keyword refers to the const user above...

    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token}) //201
    //what you send back depends on what you want in the frontend, like sending back the token, (also you can send the name so we can immedialty use & displays the name), whatever you want just beware of critical user info
}

const login = async (req,res) => {
    const {email,password} = req.body

    if(!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }  //easier to check for error here and set the response, also if one is provided and other is not mongoose wont provide err for some reason, you will get an empty error (error hanlder internal server error 500)

    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials bcz of email')
    }

    const isPasswordCorrect = await user.comparePassword(password) //await bcz our function is async (go to the user schmea file)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials bcz of password')
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
    register,
    login
}

//chec empty values here, but we are doing that in mongoose
//mongoose validators doesn't send meaningful responses, such as a general status code, and massive error object, so sometimes we need to check here for errors and send meaningful status code responses

//if we are storing password as a string, then if someone hacked the database, users life will be hell, bcz the hacker will see the passwords, and usually people use the same password for everything
//please NEVER EVER EVER EVER EVER EVER!!!!!! store or use passwords as a string
//sln: hash them instead (generating random bytes and combining them with the password)
//hasing is a one way street, it cannot be reversed, if input is tiny bit changed the resulting hash is completly different
//so it protects the password
//bcryptjs to hash passwords
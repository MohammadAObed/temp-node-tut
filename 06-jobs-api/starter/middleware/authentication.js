const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {BadRequestError, UnauthenticatedError} = require('../errors')

//this auth will be added to every jobs route, (bcz user needs token to access his info, once successful, he can have access to only!! his info)
//also if it passes the test, then we have  access to the user id and we & user can do whatever crud desired, hurraaaay...

const auth = async (req,res,next) => {
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to job routes

        //[1]

        req.user = {userId:payload.userId, name:payload.name} //name not even needed bcz we can get it with id
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')
    }

}

module.exports = auth


        //[1]
        //other people flavour to access user,
        //const user = await User.findById(payload.id).select('-password') //selects everything except password
        //req.user = user
        //no need for the above flavour, bcz we have the id from the payload from token, then in the jobs controllers we will do whatever we want using the user id
        //so in req.user we basically only need the id of the user, which is passed when the user logged in and we signed the token
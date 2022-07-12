//used for restricted routes that requires the token verification

const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async (req,res,next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError(`No token provided`) //invalid credentials to acces the route
    }

    const token = authHeader.split(' ')[1]

     //verify that the token is valid
     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //now we're talking!!!!!!! token will be vierifed by the secret value!!!!!!!!!!!!!
        // console.log(decoded)
        const {id,username} = decoded
        req.user = {id,username}        
        next() //in routes folder this next will invoke the second argument in get method which is the dashboard

    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }

}


module.exports = authenticationMiddleware //use it in routes file
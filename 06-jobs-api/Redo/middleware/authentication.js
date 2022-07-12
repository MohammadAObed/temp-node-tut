
const jwt = require('jsonwebtoken')
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors')


const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Access denied, Invalid auth header')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name}
        next()
    } catch(error) {
        throw new UnauthenticatedError('Access denied, invalid token')
    }


}

module.exports = authMiddleware
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors')

const register = async (req,res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token })
}

const login = async (req,res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('Please provide emai & password')
    }
    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials bcz of email')
    }
    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword) {
        throw new UnauthenticatedError('Invalid Credentials bcz of password')
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

//temp, for testing
const getAllUsers = async(req,res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({users}) 
}

module.exports = {
    register, login, getAllUsers
}
//just when testing in postman, do the login route, then copy the token then put it in authorization attr in Headers 

const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors') 

const getAllJobs = async (req,res)=> {
    const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt') //remember that every request will execute the authentication middleware, which if succeeds will create the req.user
    res.status(StatusCodes.OK).json({count: jobs.length,jobs })
}

const getJob = async (req,res)=> {
    const {user:{userId},params:{id:jobId}} = req //nested destructuring, accessing req.user and getting the userId from the token decoded payload, accessing req.params & getting the job id from it...
    //id: the (/id:) param
    
    const job = await Job.findOne({ 
        _id:jobId, createdBy:userId //so maybe someone can get the id with only the jobId (thats why we also use the userId)
    })
    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req,res)=> {
    //any required but missing props will be handled by mongoose validators
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

//findOneAnd or findByIdAnd both seems to work fine...
const updateJob = async (req,res)=> {
    const {
        body: {company,position},
        user: {userId},
        params: {id: jobId}
    } = req

    if(company==='' || position === '') {
        throw new BadRequest('Company or Position fields cannot be empty')
    }

    const job = await Job.findOneAndUpdate(
        {_id:jobId,createdBy:userId}, 
        req.body, 
        {new:true, runValidators: true}
    )

    if(!job) {
        throw new NotFoundError(`No job with id ${ jobId }`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req,res)=> {
    const {
        user: {userId},
        params: {id:jobId}
    } = req

    const job = await Job.findByIdAndRemove({
        _id:jobId, createdBy:userId
    })

    if(!job) {
        throw new NotFoundError(`No job with id ${id}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
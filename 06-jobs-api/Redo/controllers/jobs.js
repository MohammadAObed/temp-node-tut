const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors')


const getAllJobs = async (req,res) => {
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json({jobs})
}

const getJob = async (req,res) => {
    res.send('Get job')
}

const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req,res) => {
    res.send('update jobs')
}

const deleteJob = async (req,res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}
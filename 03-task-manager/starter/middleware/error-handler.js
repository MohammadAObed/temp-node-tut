const {CustomAPIError} = require('../errors/custom-error')

//remeber the next(error) in async.js? the error is passed here (the next middlware) passed magically by express.js
const errorHandlerMiddlware = (err,req,res,next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg:`Something went wrong,Please try again`})
}

module.exports = errorHandlerMiddlware;

//error handling will be explained further on future projects
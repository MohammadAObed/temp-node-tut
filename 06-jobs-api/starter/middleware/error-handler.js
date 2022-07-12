//any error that occurs to you when testing in postman, be aware of the status code to be correct & not general 500, if 500, create stuff below to handle that


  //try juggling of commenting of the two returns below, to see the different responses, for each error & if statement below

const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong, try again later'
  }

  //the customError obj above will handle it
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  //if any mongoose schema prop has required & is empty (ValidationError) then execute the if below
  if(err.name === 'ValidationError') {
    console.log(Object.values(err.errors))
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',') //maybe password & email not provided so we need to iterate over each errors props and handle the messages
    customError.statusCode = 400 //you can use lib instead
  }

  if(err.code && err.code === 11000) { //mongoose error has an object that has the code prop
    customError.msg = `Duplicate email entered for ${Object.keys(err.keyValue)} field, please choose another value` //we are overriding the msg, object.keys will get the name of the key that will be the cause of error
    customError.statusCode = 400
  }

  if(err.name === "CastError") {
    customError.msg = `No item found with id ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({msg:customError.msg})
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}


module.exports = errorHandlerMiddleware

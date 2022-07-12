//index.js groups these errors in one object, easier to access and organize error management
//to access them you require by: const {these errors} = require('../errors') //dont type ../errors/nameoferror
//the name of index.js is important
const CustomAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')

module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError
}


//http-status-code library
//will make it easier to understand with our responses instead of juggling 400s, 401s
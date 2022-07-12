//in express multiple middleware & functions as acces to the objects(err,req,res,next) so be aware of that

const asyncWrapper = (fn) => {
    return async (req,res,next) => { //return the functionality back in controller (getAllTasks)
        try {
            await fn(req,res,next); //code inside fn will get executed (the task.find, etc...)
        } catch (error) {
            next(error) //look for expressjs docs errors. pass it to next middleware (if not handle the pass, it will be passed to default one (builtin express error handler))
        }
    }
} //all errors will be passed to and handled in errorHanlderMiddleware
module.exports = asyncWrapper;
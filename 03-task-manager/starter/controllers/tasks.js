//go to mongoose docs to see the different methods applied on the database (Model.find() or Model.create() or etc..., like get the data update the data....)

//Models are fancy constructors compiled from schema definitions, an instance of the model is a document
//models responsible for creating and reading documents from mongodb database
const Task = require('../models/Task');

//create middleware that doesn't let us to repeat wourselves with try & catch (will wrap our controllers)
const asyncWrapper = require('../middleware/async')

//for specific errors, ex: not correct id 
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req,res) => { //asyncWrapper will get invoked and getAllTasks will still have the functionality (bcz it returns the function)
    
        const tasks = await Task.find({}); //gets all documents in a collection, {} means no filtering options
        res.status(200).json({tasks}); //same as {tasks:tasks} (destructuring) (meaning: return an object named "tasks" with the value of const tasks ;
        // res.status(200).json({tasks,amount:tasks.length})
        // res
        // .status(200)
        // .json({status:"success",data:{tasks,nbHits:tasks.length}}) //just be aware you can have multiple options, be aware axios in frontend must be updated
})

const createTask = asyncWrapper(async (req,res) => {
  
        const task = await Task.create(req.body); //?CREATES A DOCUMENT IN THE DATABASE. create method looks for an object with the props defined by schema(const task is an instance of the model).
        //check mongoose docs to see different flavours of creating the task
        res.status(201).json({task});
    

})

const getTask = asyncWrapper(async (req,res,next) => {
   
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with id : ${taskID}`,404)) //return is important!!!!!!
        }
        res.status(200).json({task})
})

const deleteTask = asyncWrapper(async (req,res) => {
   
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task) {
            return next(createCustomError(`No task with id : ${taskID}`,404)) 
        }
        // res.status(200).json({task}); 
        // res.status(200).send();
        res.status(200).json({task:null,status:'sucess'});
    
})


const updateTask = asyncWrapper(async (req,res) => {
    
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true, //rturn the new updated task
            runValidators:true //validators in the model file, Schema,
        })

        if(!task) {
            return next(createCustomError(`No task with id : ${taskID}`,404)) //return is important!!!!!!
        }

        res.status(200).json({task})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}
const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        require: [true, 'Please provide company'],
        maxlength:50
    },
    position:{
        type: String,
        require: [true, 'Please provide position'],
        maxlength: 100
    },
    status:{
        type: String,
        enum: ['interview','declined','pending'],
        default: 'pending'
    },
    createdBy:{ //Most important! will tie the job with the user that created it
        type:mongoose.Types.ObjectId,
        ref:'User', //which model we are referencing (which table (collection)) (like a forein key)
        required: [true, 'Please provide user']
    }
},{timestamps:true}) //options, timestamps will add two attributes for the document which are createdAt, updatedAt

module.exports = mongoose.model('Job', JobSchema)
const mongoose = require("mongoose")
const User = require('./User')
const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: 2,
    },
    description:{
        type: String,
        required: false,
        min:2
    },
    status:{
        type: Boolean,
        required: true,
        default: false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})

module.exports = mongoose.model("Tasks", TaskSchema)
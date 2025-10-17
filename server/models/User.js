const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    email:{
        type: String,
        required: true,
        min:6,
        max:255
    },
    userType:{
        type: String,
        enum:["user", "admin"],
        required: true,
        default:"user"
    },
    password:{
        type: String,
        required: true,
        min:6,
        max:1024
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema)
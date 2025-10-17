const Joi = require('@hapi/joi')

//login validation
const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
        .min(6)
        .email()
        .required(),
        password: Joi.string()
        .min(6)
        .required()
    }
    
    return Joi.object(schema).validate(data)
}

//register validation
const registerValidation = (data) => {
    const schema = {
        name: Joi.string()
        .min(6)
        .required(),
        email: Joi.string()
        .min(6)
        .email()
        .required(),
        password: Joi.string()
        .min(6)
        .required()
    }
    
    return Joi.object(schema).validate(data)
}

//contact validation
const taskValidation = (data) => {
    const schema = {
        title: Joi.string()
        .min(2)
        .required(),
        description: Joi.string()
        .min(2)
        .required(),
        userId: Joi.string()
        .required()
    }
    
    return Joi.object(schema).validate(data)
}

//changePass validation
const changePassValidation = (data) => {
    const schema = {
        currentPassword: Joi.string()
        .required(),
        newPassword: Joi.string()
        .min(6)
        .required()
    }
    
    return Joi.object(schema).validate(data)
}

module.exports.changePassValidation = changePassValidation
module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation
module.exports.taskValidation = taskValidation
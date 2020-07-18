// validation middleware
const Joi = require('joi');

const schema = {
    
    "register": Joi.object({
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        dob: Joi.string().required(),
        username: Joi.string().min(3).max(30),
        gender: Joi.string().min(2),
    }),

    "login": Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    }),

    "verify_email": Joi.object({
        verify_token: Joi.string().min(5).required()
    })

}

module.exports = schema;

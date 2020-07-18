const Joi = require('joi');

const schema = {
    
    "create_enrollment": Joi.object({
        course_id: Joi.number().required()
    }),

    "delete_enrollment": Joi.object({
        enrol_id: Joi.string().min(4).required()
    })

}

module.exports = schema;

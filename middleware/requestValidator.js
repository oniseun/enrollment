// validation middleware
const Joi = require('joi');



module.exports =
    class requestValidator {
        createUser(req, res, next) { // validate createUser fields

            const schema = Joi.object().keys(
                {
                    name: Joi.string().min(3).max(30).required(),
                    email: Joi.string().email().required(),
                    phone: Joi.number().required(),
                    address: Joi.string().required(),
                    password: Joi.string().min(5).required()
                });


            let result = Joi.validate(req.body, schema);

            if (result.error === null) {
                next();
            }
            else {
                res.status(400).json({ success: false, message: result.error });
                return;
            }


        }

        loginUser(req, res, next) { // validates Login

            const schema = Joi.object().keys(
                {
                    phone: Joi.number().required(),
                    password: Joi.string().min(5).required()
                });


            let result = Joi.validate(req.body, schema);

            if (result.error === null) {
                next();
            }
            else {
                res.status(400).json({ success: false, message: result.error });
                return;
            }


        }

        loanApplication(req, res, next) { // validates loan aplication

            const schema = Joi.object().keys(
                {
                    loanSN: Joi.number().max(2).required(),
                });


            let result = Joi.validate(req.body, schema);

            if (result.error === null) {
                next();
            }
            else {
                res.status(400).json({ success: false, message: result.error });
                return;
            }


        }
    }


const express = require('express')
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const validator = require('express-joi-validation').createValidator({passError: true})
const schema = require('../models/validators/usersSchema');

router.post('/users/register', validator.body(schema['register']), UsersController.register)
router.post('/users/login', validator.body(schema['login']),  UsersController.login)
router.get('/users/verify-email/:verify_token', validator.params(schema['verify_email']), UsersController.verify_email)

module.exports = router


var express = require('express')
var router = express.Router();
const UsersController = require('../controllers/UsersController');


router.post('/users/register', UsersController.register)
router.post('/users/login',  UsersController.login)
router.get('/users/verify-email/:verify_token',UsersController.verify_email)

module.exports = router
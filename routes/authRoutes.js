

var express = require('express')
var router = express.Router();
const UsersController = require('../controllers/UsersController');


router.post('/users/register', UsersController.register)
router.get('/users/login',  UsersController.login)
router.delete('/users/verify-email/:verfiy_token',UsersController.verify_email)

module.exports = router
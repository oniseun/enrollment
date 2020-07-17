var express = require('express')
var router = express.Router();
const EnrollmentController = require('../controllers/EnrollmentController');

const validator = new (require('../middleware/requestValidator.js'));


router.post('/enrollments/create', EnrollmentController.create_enrollment)
router.get('/enrollments/list',  EnrollmentController.get_enrollments)
router.delete('/enrollments/delete', EnrollmentController.delete_enrollment)

module.exports = router
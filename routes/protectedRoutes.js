const express = require('express')
const router = express.Router();
const EnrollmentController = require('../controllers/EnrollmentController');
const validator = require('express-joi-validation').createValidator({ passError: true})
const schema = require('../models/validators/enrollmentSchema');

router.get('/enrollments/courses', EnrollmentController.get_course_list)
router.post('/enrollments/create', validator.body(schema['create_enrollment']), EnrollmentController.create_enrollment)
router.get('/enrollments/list',  EnrollmentController.get_enrollments)
router.delete('/enrollments/delete', validator.body(schema['delete_enrollment']), EnrollmentController.delete_enrollment)

module.exports = router
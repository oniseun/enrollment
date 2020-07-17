const AppResponse = require('../models/AppResponse')
const axios = require('axios')
const admin = require('firebase-admin');
const db = admin.firestore();

module.exports =

    class EnrollmentController {
        static async get_courses() {
        
            try {
                const response = await axios.get('https://5ea5cbca2d86f00016b46276.mockapi.io/api/courses');
                console.log(response)
                return response.data;
              } catch (error) {
                console.error(error);
                throw error;
              }

        }
        static get_course_list(req, res, next) {            
            (async () => {
            try {            
                const course_list = await EnrollmentController.get_courses();
                return res.status(200).json(new AppResponse(0, "Successfull", {course_list}) );

             } catch (error) {
                 console.log(error)
                 return res.status(404).json(new AppResponse(-1, "Error fetching course list , please try again", {}, [error]) );
             }

            })()

        }

        static create_enrollment(req, res, next) {
            (async () => {
            
            try {
                const email = res.locals.email // to be gotten from auth middleware
                let { course_id } = req.body
               const docRef = db.collection('enrollments').doc();
               const courses = await EnrollmentController.get_courses()
               const course_details = courses.find( c => c.id = course_id);
                console.log(course_details)
                const data = {
                    "enrol_id": docRef.id,
                    course_id, 
                    email,
                    course_details

                }

                await docRef.set(data)
                
                return res.status(200).json(new AppResponse(0, "Course Added SuccessFully", {course_details}) );
            } catch (error) {
                console.log(error)
                return res.status(401).json(new AppResponse(-1, "Failed to add course", {}, [error]) );
            }

        })()

        }

        static get_enrollments(req, res, next) { // logs in user            
            (async () => {
            try {
                const email = res.locals.email // to be gotten from auth middleware
            
                const docRef = db.collection('enrollments')
                const snapshot = await docRef.where('email', '==', email).get();
                if (snapshot.empty) {
                    return res.status(404).json(new AppResponse(-1, "No course enrollments found for user") );               
                }  
                const list = []
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    list.push(doc.data())
                  });
    

                return res.status(200).json(new AppResponse(0, "Successfull", {list}) );

             } catch (error) {
                 return res.status(404).json(new AppResponse(-1, "No course enrollments found for user", {}, [error]) );
             }
            })()

        }

        static  delete_enrollment(req, res, next) { // logs in user            
            (async () => {
            try {
                let { enrol_id } = req.body;
                const auth_email = res.locals.email // to be gotten from auth middleware
                console.log(`delete enrol id : ${enrol_id}`)
                const docRef = db.collection('enrollments').doc(enrol_id)
                const doc = await docRef.get();

                if(!doc.exists) {
                    return res.status(404).json(new AppResponse(-1, "Enrollment does not exist", {}, []) );
                }
                const owner_email = doc.data().email;
                console.log(`${owner_email} : ${enrol_id}`)
                if(owner_email == auth_email) {
                    const del = await docRef.delete();
                    return res.status(200).json(new AppResponse(0, "Enrollment Deleted successfully ", {del, "data" : doc.data()}) );
                } else {
                    return res.status(404).json(new AppResponse(-1, "Erollment not created by user", {}, []) );
                }


             } catch (error) {
                 console.log(error)
                 return res.status(404).json(new AppResponse(-1, "Error Deleting enrollment", {}, [error]) );
             }
            })()

        }


    }
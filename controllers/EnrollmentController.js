const AppResponse = require('../models/AppResponse')
const axios = require('axios')
const admin = require('firebase-admin');
const db = admin.firestore();

module.exports =

    class EnrollmentController {
        static get_courses() {
            (async () => {
                
            try {
                const response = await axios.get('https://5ea5cbca2d86f00016b46276.mockapi.io/api/courses');
                return response;
              } catch (error) {
                console.error(error);
                throw error;
              }

            })
        }
        static create_enrollment(req, res) {
            (async () => {
            
            try {
                const email = res.locals.email // to be gotten from auth middleware
                let { course_id } = req.body
               const docRef = db.collection('enrollments').doc();
               const course_details = EnrollmentController.get_courses().find( c => c.id = course_id);

                const data = {
                    "enrol_id": docRef.id,
                    course_id, 
                    email,
                    course_details

                }

                await docRef.set(data)

                return res.status(200).json(new AppResponse(0, "Course Added SuccessFully", {course_details}) );
            } catch (error) {
                return res.status(401).json(new AppResponse(0, "Failed to add course", {}, [error]) );
            }

        })

        }

        static get_enrollments(req, res) { // logs in user            
            (async () => {
            try {
                const email = res.locals.email // to be gotten from auth middleware
            
                const docRef = db.collection('enrollments')
                const snapshot = await docRef.where('email', '==', email).get();
                if (snapshot.empty) {
                    return res.status(404).json(new AppResponse(-1, "No course enrollments found for user") );               
                }  

                return res.status(200).json(new AppResponse(0, "Successfull", {snapshot}) );

             } catch (error) {
                 return res.status(404).json(new AppResponse(-1, "No course enrollments found for user", {}, [error]) );
             }
            })

        }

        static  delete_enrollment(req, res) { // logs in user            
            (async () => {
            try {
                let { enrol_id } = req.body;
                const auth_email = res.locals.email // to be gotten from auth middleware

                const docRef = db.collection('enrollments').doc(enrol_id)
                
                const doc = await docRef.get();
                const user_email = doc.data().email;
                if(user_email == auth_email) {
                    const res = await db.collection('enrollments').doc(enrol_id).delete();
                    return res.status(200).json(new AppResponse(0, "Enrollment Deleted successfully ", {res}) );
                } else {
                    return res.status(404).json(new AppResponse(-1, "Error Deleting enrollment", {}, [error]) );
                }


             } catch (error) {
                 return res.status(404).json(new AppResponse(-1, "Error Deleting enrollment", {}, [error]) );
             }
            })

        }


    }
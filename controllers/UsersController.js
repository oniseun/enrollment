const uuid = require('uuid');
const md5 = require('md5');
const AppResponse = require('../models/AppResponse')


const admin = require('firebase-admin');
const db = admin.firestore();

module.exports =

    class UsersController {

        static register(req, res) {
           
        (async () => {
            try {
                let { first_name, last_name, email, username = null, password, dob, gender = null } = req.body
                const accessToken = uuid();
                password = md5(password); // encrypt password
                const verify_token = md5(`${accessToken}/${password}`)

                const docRef = db.collection('users').doc(email);
                const user = {
                    first_name,
                    last_name,
                    username,
                    password,
                    dob,
                    gender,
                    accessToken,
                    "email_verified" : false,

                }

                await docRef.set(user)

                const verifyRef = db.collection('email_verification').doc(verify_token);
                await verifyRef.set({email})

                return res.status(200).json(new AppResponse(0, "User Registration Successfull, please confirm your email") );
            } catch (error) {
                return res.status(401).json(new AppResponse(-1, "User Registration Failed", {}, [error]) );
            }
        })
        

        }

        static login(req, res) { // logs in user            
        (async () => {
            try {
                let { email,  password} = req.body
                password = md5(password);

                const docRef = db.collection('users').doc(email);
                const doc = await docRef.get();
                const accessToken = doc.data().accessToken

                return res.status(200).json(new AppResponse(0, "Login successfull, copy your accesstoken ", {accessToken}) );

             } catch (error) {
                 return res.status(404).json(new AppResponse(0, "Invalid/Incorrect Username or password", {}, [error]) );
             }
        })

        }

        static verify_email(req, res) { // logs in user            
            (async () => {
            try {
                let { verify_token } = req.body

                const docRef = db.collection('email_verification').doc(verify_token);
                const doc = await docRef.get();
                const email = doc.data().email;

                const userRef = db.collection('users').doc(email);
                await userRef.update({ "email_verified" : true})

                return res.status(200).json(new AppResponse(0, "Email verified successfully ") );

             } catch (error) {
                 return res.status(404).json(new AppResponse(0, "Invalid verification token", {}, [error]) );
             }

            })

        }



    }
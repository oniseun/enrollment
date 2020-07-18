const { uuid } = require('uuidv4');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const AppResponse = require('../models/AppResponse')
const admin = require('firebase-admin');
const db = admin.firestore();

module.exports =
    class UsersController {
        static register(req, res, next) {         
        (async () => {
            try {
                console.log("registering user")
                let { first_name, last_name, email, username = null, password, dob, gender = null } = req.body
                const access_token = uuid();
                password = bcrypt.hashSync(password, 10);
                const verify_token = md5(`${access_token}${password}${Date.now()}`)

                const docRef = db.collection('users').doc(email);
                const user = {
                    first_name,
                    last_name,
                    username,
                    password,
                    dob,
                    gender,
                    access_token,
                    verify_token,
                    "email_verified" : false,

                }

                await docRef.set(user)

                const verifyRef = db.collection('email_verification').doc(verify_token);
                await verifyRef.set({email})
                
                return res.status(200).json(new AppResponse(0, "User Registration Successfull, please confirm your email", {verify_token}) );
            
            
            } catch (error) {
                console.log(error)
                return res.status(401).json(new AppResponse(-1, "User Registration Failed", {}, [error]) );
            }     
        })()

        }

        static login(req, res, next) { // logs in user            
        (async () => {
            try {
                let { email,  password} = req.body

                const docRef = db.collection('users').doc(email);
                const doc = await docRef.get();
                if(doc.data().empty || !bcrypt.compareSync(password, doc.data().password) || doc.data().access_token == undefined ){
                    return res.status(404).json(new AppResponse(-1, "Invalid/Incorrect Username or password", {}, []) );
                } else if (doc.data().email_verified == false ){
                    const verify_token = doc.data().verify_token
                    return res.status(404).json(new AppResponse(-1, "You need to verify your email", {verify_token}, []) );
                }

                const access_token = doc.data().access_token

                return res.status(200).json(new AppResponse(0, "Login successfull, copy your accesstoken ", {access_token}) );

             } catch (error) {
                 return res.status(404).json(new AppResponse(-1, "Invalid/Incorrect Username or password", {}, [error]) );
             }
        })()

        }

        static verify_email(req, res, next) { // logs in user            
            (async () => {
            try {
                let { verify_token } = req.params
                console.log(`verify token : ${verify_token}`)
                const docRef = db.collection('email_verification').doc(verify_token);
                const doc = await docRef.get();
                const email = doc.data().email;

                const userRef = db.collection('users').doc(email);
                await userRef.update({ "email_verified" : true})

                return res.status(200).json(new AppResponse(0, "Email verified successfully ") );

             } catch (error) {
                 return res.status(404).json(new AppResponse(-1, "Invalid verification token", {}, [error]) );
             }

            })()

        }
    }
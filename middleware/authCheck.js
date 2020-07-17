// auth middleware

const admin = require('firebase-admin');
const db = admin.firestore();

const AppResponse = require('../models/AppResponse')

module.exports = function authCheck(req, res, next) { // checks if user is logged in 

    // first check if request headers has authorization token 

    if (req.headers.authorization) { // if bearer token exist

        const accessToken = req.headers.authorization.split(' ', 2)[1]; // strip access token
        (async () => {
        // check database to be sure if token exist
        try {
            
            const docRef = db.collection('users')
            const snapshot = await docRef.where('access_token', '==', accessToken).get();
            if (snapshot.empty) {
                return res.status(404).json(new AppResponse(-1, "User not found") );               
            }  
            let email = null
            snapshot.forEach(doc => {
                email = doc.id
              });

            console.log(`${email} :: ${accessToken}`)
            res.locals.accessToken = accessToken;
            res.locals.email = email;
            next();
        }
        catch (e) {
            console.log(e)
            res.status(403).json(new AppResponse(-1, "Invalid authorization token, please re-validate", {}, [e])) 
        }

        })()

    }
    else {

        res.status(403).json(new AppResponse(-1, "Unauthorized access, please include token in header", {}, []));
    }

}

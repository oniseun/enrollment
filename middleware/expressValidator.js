const AppResponse = require('../models/AppResponse')

module.exports = function expressValidator(err,req, res, next) { // checks if user is logged in 

    if (err && err.error && err.error.isJoi) {
        console.log('validation error::',err)
        // we had a joi error, let's return a custom 400 json response
        return res.status(400).json( new AppResponse(-1, err.error.toString(), {}, [err]));

      } else {
        // pass on to another error handler
        next(err);
      }
    
}

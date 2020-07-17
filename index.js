const dbo = require('./libs/dbObject.js');
var dbCollections = require('./libs/dbCollections.js');

const authCheck = require('./middleware/authCheck.js');

dbCollections.setup(dbo); // initialize Tables

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// require routhes

app.use('/api/', require('./routes/authRoutes.js'));
app.use('/api/', authCheck, require('./routes/protectedRoutes.js')); // requires authentication check




const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Loan app listening on port ${port}!`))
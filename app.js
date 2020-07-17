
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccount.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authCheck = require('./middleware/authCheck.js');

// create

app.use('/api/', require('./routes/authRoutes.js'));

app.use('/api/', authCheck, require('./routes/protectedRoutes.js')); // requires authentication check


const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Enrollment app listening on port ${port}!`))
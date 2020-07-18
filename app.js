
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require("express-rate-limit");
const admin = require('firebase-admin');
const serviceAccount = require("./config/serviceAccount.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60 // limit each IP to  60 requests per windowMs
});
   
  //  apply to all requests
app.use(limiter);
app.use(helmet());
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
morgan.token('payload', (req, res) => `${JSON.stringify(req.body, (k, v) => k.includes('password') ? '***' :v)} - ${JSON.stringify(req.params)} - ${JSON.stringify(req.query)}`)
const logger = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":payload"')
app.use(logger)

const authCheck = require('./middleware/authCheck');
const expressValidator = require('./middleware/expressValidator');

// >> API Endpoints

app.use('/api/', require('./routes/authRoutes.js'));

app.use('/api/', authCheck, require('./routes/protectedRoutes.js')); // requires authentication check

app.use(expressValidator)

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`Enrollment app listening on port ${port}!`))
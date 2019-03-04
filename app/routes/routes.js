/**
 * Routes
 * @description Refers to how an application’s endpoints (URIs) 
 * respond to client requests. Application listens for requests that match 
 * the specified route(s) and method(s), and when it detects a match, 
 * it calls the specified callback function
 * @author Aswin Sasi
 * created on 2018/12/03
 */

/**
 * Require npm modules
 */
let express = require('express');
// let jwt = require('jsonwebtoken'); // for authentication
// let randtoken = require('rand-token'); // to generate random token
let helmet = require('helmet') // helps to secure apps by setting HTTP headers
let path = require('path');
let cors = require('cors');
let bodyParser = require('body-parser');
let compression = require('compression');
let cookieParser = require('cookie-parser');
// let multer = require('multer'); // for file upload
// ----------------------------------------------------------------------------

/**
 * Require external files
 */
let config = require('../config/server');
let logger = require('../../middlewares/logger');
let dbschema = require('../db/dbschema');
let userIndex = require('../components/users/index');
let contactsIndex = require('../components/contacts/index');
// let scannerIndex = require('../components/scanner/index');
// ----------------------------------------------------------------------------

/**
 * Variable declaration
 */
let app = express();
let v1 = '/api/v1/';
let cronV1 = '/cron/v1/';
// let upload = multer({ dest: 'public/temp/' });
let debugmode = config.serverConfig.debugMode;
// ----------------------------------------------------------------------------

/**
 * Call the middleware functions
 */
app.use(helmet());
app.use(helmet.hpkp({
    maxAge: 7776000,
    sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}));
app.use(helmet.noCache());
app.use(helmet.expectCt());
app.use(helmet.referrerPolicy());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(logger.requestL{{BASE_URL}}/api/v1/todosogger); // Log every request
// app.use(auth.auth); {{BASE_URL}}/api/v1/todos// Authenticate the access token and set user session
// app.use(validator.re{{BASE_URL}}/api/v1/todosquestValidator); // Validate every request parameters
// app.use(validator.va{{BASE_URL}}/api/v1/todoslidateProspect); // Validate existance of prospect
app.use(compression());{{BASE_URL}}/api/v1/todos
// --------------------{{BASE_URL}}/api/v1/todos--------------------------------------------------------

/**
 * @method getRouter
 * @description Define routes
 * @returns: {Object} app the express object 
 */
exports.getRouter = function () {

    // ------------------------------------------------------------------------
    // Api v1 routes
    // authentication related
    app.get('/', (req, res) => {
        res.send('Welcome to Fcube')
    });
    app.get(v1 + 'test', (req, res) => {
        res.send('test')
    });
    app.post(v1 + 'dbcreation', dbschema.createSchema);
    app.post(v1 + 'userdetails', userIndex.userDetails);
    app.post(v1 + 'activitydetails', userIndex.activityDetails);
    app.post(v1 + 'dialhistory', contactsIndex.callHistory);
    app.post(v1 + 'getlocations', userIndex.nearLocations);
    // app.post(v1 + 'webscanner', scannerIndex.scanner);
    // ------------------------------------------------------------------------

    // Web routes
    // app.get('/db/load-schema', require('../db/schema').createSchema);
    // ------------------------------------------------------------------------

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        err.path = req.path;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = debugmode ? err : {};
        // render the error page
        logger.errorLogger(err);
        res.status(err.status || 500);
        res.send({ 'error': err.status, 'message': err.message });
    });

    return app;
}
// ----------------------------------------------------------------------------

/**
 * @file logger
 * @description Middleware for winston logging.
 * For logging every requests automatically or custom messages
 * @author Aswin Sasi
 * created on 2018/12/03 
 */

/**
 * Require files
 */
var winston = require('../app/config/winston');
// ----------------------------------------------------------------------------

/**
 * Variable declaration
 */
var logger = winston.logger;
// ----------------------------------------------------------------------------

/**
 * @method requestLogger
 * @description Log every request (except login) to the system
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next control to next middleware
 * @returns void
 */
exports.requestLogger = function (req, res, next) {
    let urlParts = req.path.split('/');
    let path = urlParts[3] + '/' + urlParts[4];

    if (path == 'users/login') {
        next();
    } else {
        var requestParams = '';
        switch (req.method) {
            case 'GET':
                requestParams = JSON.stringify(req.query);
                break;
            case 'POST':
                requestParams = JSON.stringify(req.body);
                break;
            default:
                requestParams = JSON.stringify(req.body);
        }

        let info = 'request: ' + req.method + ' ' + req.path
            + ', ip: ' + req.ip + ', params: '
            + requestParams;

        logger.info(info);

        next();
    }
}
// ----------------------------------------------------------------------------

/**
 * @method infoLogger
 * @description Common function to log custom informations
 * @param {String} message Message to be logged
 * @returns void
 */
exports.infoLogger = function (message) {
    logger.info(message);
}
// ----------------------------------------------------------------------------

/**
 * @method errorLogger
 * @description Common function to log custom errors
 * @param {String} message Message to be logged
 * @returns void
 */
exports.errorLogger = function (message) {
    logger.error(message);
}
// ----------------------------------------------------------------------------
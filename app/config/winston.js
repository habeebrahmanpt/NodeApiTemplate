/**
 * @file winston
 * @description Configure winston for logging 
 * @author Aswin Sasi
 * created on 2018/12/03 
 */

/**
 * npm middlewares
 */
var winston = require('winston');
// ----------------------------------------------------------------------------

/**
 * Configuring logger:
 * Have seperate logs for info, error and exceptions
 */
var date = new Date();
var dateString = date.getFullYear() + '-'
    + (parseInt(date.getMonth()) + 1) + '-' + date.getDate();
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-log',
            filename: 'logs/info-' + dateString + '.log',
            level: 'info'
        }),

        new (winston.transports.File)({
            name: 'error-log',
            filename: 'logs/error-' + dateString + '.log',
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/exceptions-' + dateString + '.log'
        })
    ],
    exitOnError: false
});
// ----------------------------------------------------------------------------

exports.logger = logger;
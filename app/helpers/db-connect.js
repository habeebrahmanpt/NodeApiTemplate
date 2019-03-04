/**
 * @file db-connect 
 * @description Connect to database. 
 * Helper for database queries.
 * Every database query requests are processed here
 * @author Aswin Sasi
 * created on 2018/12/05 
 */

/**
 * Require modules
 */
const MONGO_CLIENT = require('mongodb');
// ----------------------------------------------------------------------------

/**
 * Require files
 */
const DB_CONFIG = require('../config/db');
let logger = require('../../middlewares/logger');
// ----------------------------------------------------------------------------

exports.client = MONGO_CLIENT;

/**
 * @method db
 * @description Connect to database and retrieve db object
 * @param {Function} callback 
 */
exports.db = function (callback) {
    MONGO_CLIENT.connect(DB_CONFIG.dbConfig.host, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log('Unable to connect to server: ' + new Date());
            // client.close();
            callback(err);
        } else {            
            callback(null, client.db(DB_CONFIG.dbConfig.database), client);
        }
    });
}
// ----------------------------------------------------------------------------

/**
 * @method find
 * @description Find aggregated records
 * @param {String} table 
 * @param {Object[]} query Complete query including joins and aggregations
 * @param {Function} callback 
 * @returns void
 */
exports.find = function (table, query, callback) {    
    this.db(function (err, res, client) {
        if (err) {
            logger.errorLogger(JSON.stringify(err));
            let error = {
                error: '422',
                message: 'Could not process the request'
            }
            client.close();
            callback(error);
        } else {

            res.collection(table).aggregate(
                query
            ).toArray(function (err, res) {
                if (err) {
                    logger.errorLogger(JSON.stringify(err));

                    let error = {
                        error: '422',
                        message: 'Could not process the request'
                    }
                    client.close();
                    callback(error);
                } else {
                    client.close();                    
                    callback(null, res);
                }
            });
        }
    });
}
// ----------------------------------------------------------------------------
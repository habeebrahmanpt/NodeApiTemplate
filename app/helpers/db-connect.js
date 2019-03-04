/**
 * @file db-connect 
 * @description Connect to database. 
 * Helper for database queries.
 * Every database query requests are processed here
 * @author Habeeb 
 * created on 2018/04/03 
 */

/**
 * Require modules
 */
const MONGO_CLIENT = require('mongodb');
// ----------------------------------------------------------------------------

/**
 * Require files
 */
var logger = require('../../middlewares/logger');
const DB_CONFIG = require('../config/db');
// ----------------------------------------------------------------------------

exports.client = MONGO_CLIENT;

/**
 * @method db
 * @description Connect to database and retrieve db object
 * @param {Function} callback 
 */
exports.db = function (callback) {
    MONGO_CLIENT.connect(DB_CONFIG.dbConfig.host, (err, client) => {
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
 * @method findOne
 * @description Find a single record from a table
 * @param {String} table 
 * @param {Object} match where condition
 * @param {Object} columns columns to be returned
 * @param {Function} callback 
 * @returns void
 */
exports.findOne = function (table, match, columns, callback) {
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
            res.collection(table).findOne(match, columns, function (err, res) {
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

/**
 * @method distinct
 * @description Find distinct aggregated records
 * @param {String} table 
 * @param {String} column column that distinct to be performed 
 * @param {Object} query where condition
 * @param {Function} callback 
 * @returns void
 */
exports.distinct = function (table, column, query, callback) {
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

            res.collection(table).distinct(
                column,
                query,
                function (err, res) {
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
                }
            );
        }
    });
}
// ----------------------------------------------------------------------------

/**
 * @method isExist
 * @description Check existance of record
 * @param {String} table
 * @param {Object} query where condition
 * @param {Function} callback 
 * @returns void
 */
exports.isExist = function (table, query, callback) {
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
            res.collection(table).find(
                query,
                { _id: 1 }
            ).count(function (err, res) {
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

/**
 * @method insert
 * @description Insert records to database
 * @param {String} table Table name
 * @param {Object} params The column and value pair object
 * @param {Function} callback 
 * @returns void
 */
exports.insert = function (table, params, callback) {
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
            res.collection(table).insert(params, function (err, res) {
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

/**
 * @method insertOne
 * @description Insert single record to database
 * @param {String} table Table name
 * @param {Object} params The column and value pair object
 * @param {Function} callback 
 * @returns void
 */
exports.insertOne = function (table, params, callback) {
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
            res.collection(table).insertOne(params, function (err, res) {
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

/**
 * @method insertMany
 * @description Insert multiple records to database
 * @param {String} table 
 * @param {Object[]} params The column and value pair object array
 * @param {Function} callback 
 * @returns void
 */
exports.insertMany = function (table, params, callback) {
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
            res.collection(table).insertMany(params, function (err, res) {
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

/**
 * @method updateOne
 * @description Update a single record satisfying the where condition
 * @param {String} table 
 * @param {Object} filter Filter condition for the record
 * @param {Object} params Column - value pair object
 * @param {Object} options upsert/returnOriginal options
 * @param {Function} callback 
 * @returns void
 */
exports.updateOne = function (table, filter, params, options, callback) {
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
            res.collection(table).findOneAndUpdate(
                filter,
                { $set: params },
                options,
                function (err, res) {
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
                }
            );
        }
    });
}
// ----------------------------------------------------------------------------

/**
 * @method updateMany
 * @description Update multiple records satisfying the where condition
 * @param {String} table 
 * @param {Object} filter Filter condition for the record
 * @param {Object} params Column - value pair object
 * @param {Object} options upsert/returnOriginal options
 * @param {Function} callback 
 * @returns void
 */
exports.updateMany = function (table, filter, params, options, callback) {
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
            res.collection(table).updateMany(
                filter,
                { $set: params },
                options,
                function (err, res) {
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
                }
            );
        }
    });
}
// ----------------------------------------------------------------------------

/**
 * @method delete
 * @description Delete multiple records
 * @param {String} table
 * @param {Object} params where condition 
 * @param {Function} callback 
 * @returns void
 */
exports.delete = function (table, params, callback) {
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
            res.collection(table).deleteMany(params, function (err, res) {
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
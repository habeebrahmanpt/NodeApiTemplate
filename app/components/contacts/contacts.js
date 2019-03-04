/**
 * User
 * @description User related functions
 * @version 1.0.0
 * @author Aswin sasi
 * created on 2018/05/14
 */

/**
 * Require files
 */
var contactsModel = require('./contacts.model');
// ----------------------------------------------------------------------------
exports.getDialHistory = function(req, res) {
    let params = req.body;
    let userId = params.userId;
    let activityGroup = params.activityGroup;
    contactsModel.getDialHistory(userId, activityGroup, function(err, data) {
        if(err) {
          res.status(err.statusCode);
          res.send(err.error);
        }
        else {
            res.status('200');
            res.send(
                {
                status:'success',
                message:'Prospect Details',
                data:data
               }
           )
        }
    })
}
// ----------------------------------------------------------------------------
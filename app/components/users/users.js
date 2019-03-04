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
var userModel = require('./users.model');
// ----------------------------------------------------------------------------

exports.userDetails = function( req, res) {
    console.info('controller..');
    let params = req.body;
    let id = params.id;
    let name = params.name; 
    userModel.userDetails(id, name, function (err, data) {
        if (err) {
          res.status(err.statusCode);
          res.send(err.error);
        }
        else {          
          res.status('200');
          res.send(
              {
              status:'success',
              message:'User Details',
              data:data
             }
         )
        }
    });
}
// ----------------------------------------------------------------------------
// To get the nearest locations from current location
exports.getLocations = function( req, res) {
    console.info('Locations..');
    let params = req.body;
    let location =params.location;
    let latitude = location.latitude; 
    let longitude= location.longitude; 
    console.info('latitude :',latitude);
    console.info('longitude :',longitude);
    userModel.getLocations(latitude, longitude, function (err, data) {
        if (err) {
          res.status(err.statusCode);
          res.send(err.error);
        }
        else {          
          res.status('200');
          res.send(
              {
              status:'success',
              message:'Nearest Locations',
              data:data
             }
         )
        }
    });
}
// ----------------------------------------------------------------------------

exports.activityDetails = function (req, res ) {
    let params = req.body;
    let pId = params.pId;
    let days = params.days;
    userModel.activityDetails(pId, days, function (err, data) {
        if(err) {
            res.status(err.statusCode);
            res.send(err.error);
        }
        else {
            res.status('200');
            res.send(
                {
                    status:'success',
                    message:'Activity Details',
                    data:data
                }
            )
        }
    });
}
// ---------------------------------------------------------------------------- 
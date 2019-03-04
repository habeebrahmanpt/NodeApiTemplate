/**
 * Index for settings component
 * @description Set routes for settings functions
 * @author Aswin Sasi
 * created on 2018/12/05
 */

/**
 * Require files
 */
let user = require('./users');
// ----------------------------------------------------------------------------

module.exports = {
    userDetails: user.userDetails,
    activityDetails: user.activityDetails,
    nearLocations: user.getLocations
}
// ----------------------------------------------------------------------------
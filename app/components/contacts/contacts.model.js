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
var dbconnect = require('../../helpers/db-connect');
var ObjectID = require('mongodb').ObjectID;
// --------------------------------------------------------------------- 
exports.getDialHistory = function(userId, activityGroup, callback) {
    console.info('userId:',userId);
    console.info('activityGroup:',activityGroup);
    let UserId = new ObjectID(userId);
    console.info('UserIdd:',UserId);
    let table = 'prospects';
    let match = {
        'user.$id': UserId
    }
    let project = {
        'modifiedDate':0,
        'address':0,
        'location':0,
        'notInterested':0
    }
    let activitieslookup = {
        'from' : 'activities',
        'as' : 'dialdetails',
        'let' :{ 'pid':'$_id'},
        'pipeline' : [
          {
             $match : {
                 $expr : {
                     $and : [
                         { $eq : ['$prospect.id','$$pid']},
                         { $eq : ['$activityType','dials']}
                     ]
                 } 
             }
          },
          {
              $sort : { 'modifiedDate':-1}
          }           
        ]
    }
    let query = [
        { $match : match },
        { $project : project },
        { $lookup : activitieslookup }
    ]
    dbconnect.find (table, query, function (err,res) {
        if (err) {
          let error = {
            statusCode:422,
            error:err
          }
          console.info('errrrr');
          callback(error);
        }    
       else {
        console.info('response:',res);
         callback(null,res);
       }
      }); 
} 

// --------------------------------------------------------------------- 
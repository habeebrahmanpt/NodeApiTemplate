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
   exports.userDetails = function (id, name, callback) {        
       let table = 'users';
       let ObId = new ObjectID(id);    
       let match = {        
        '_id':ObId
        // 'name':name
    };
       let query = [
                   {$match:match}
       ];
    dbconnect.find (table, query, function (err, res) { 
        if (err) {
          let error = {
            statusCode:422,  
            error: err
          }  
          callback(error);        
        }
        else {           
          callback(null,res);
        }
    });
}
// ---------------------------------------------------------------------
// Fetch the activity details of each person  
exports.activityDetails = function (pid,days,callback) {
  console.info('model..');  
  let UsrId = new ObjectID(pid);
  let latestDate = new Date();
  latestDate.setDate(latestDate.getDate()-days); 
  console.info('id:',UsrId);
  console.info('latestDate',latestDate);
  let table = 'prospects';
  let match = {
        'user.$id': UsrId,
           $and:[            
            { 'modifiedDate': { $gt: latestDate} }            
           ]    
  };
  let groupBy = {
      '_id':'$_id',
      'ActivityDetails':{ $push:'$$ROOT' }
  };
  let actlookup = {
    'from' : 'activities',
    'as':'ActivityDetails',
    'let':{ 'pid':'$_id', 'activityGroupp': '$activityGroup' },
    'pipeline': [
        {         
          $match: {
               $expr: {
                    $and:[   
                       { $eq: ['$prospect.id' , '$$pid'] },                     
                   ]   
                }
          }                                        
        },
        {
          $group: {
            '_id': '$$pid',          
            'accc': { $push: '$$ROOT' }
          } 
        },       
        {
          $project: {
            '_id':0,            
            'Activities': '$accc'            
          }
        }             
    ]
  };
  let prospectlookup = {
    'from' :'prospects',
    'localField': '_id', 
    'foreignField': '_id', 
    'as' :'ProspectDetails'    
  };
  let query = [
           { $match:match },                    
           { $group:{ '_id':'$_id' }},           
           { $lookup:actlookup },          
           { $unwind: '$ActivityDetails' }, 
           { $lookup: prospectlookup },
           { $unwind: '$ProspectDetails' },
           { $project: {'_id':0}}          
  ]
  //----------------------------------------
    dbconnect.find (table, query, function (err,res) {
      if (err) {
        let error = {
          statusCode:422,
          error:err
        }
        callback(error);
      }    
     else {       
       callback(null,res);
     }
    });
}
// ---------------------------------------------------------------------
// To retrieve the nearest locations 
exports.getLocations = function (latitude, longitude, callback) {  
  // console.info('latitude2 :',latitude);
  // console.info('longitude2 :',longitude);    
  let table = 'locations';  
  let geoNear = {    
    near: { type: "Point", coordinates: [ parseFloat(latitude) , parseFloat(longitude) ] },
        distanceField: "distance",
        // maxDistance: 2000,                
        num: 4,
        spherical: false
  }; 
  let query = [
              { $geoNear:geoNear }              
  ];
  // console.info('query :',query); 
dbconnect.find (table, query, function (err, res) { 
   if (err) {
     let error = {
       statusCode:422,  
       error: err
     }  
     callback(error);        
   }
   else { 
     console.info('Result:',res);
     callback(null,res);
   }
});
}
// ---------------------------------------------------------------------
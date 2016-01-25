var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

exports.getToken = function (callback, params) {
  console.log('inside helper getToken: ', params)
  db.User.find({where: {username: params.username}, attributes: ['token']})
  .then(function (data) {
    if(data){
      console.log('+++line10 data.dataValues.token: ', data.dataValues.token)
      console.log('+++line11 params.token: ', params.token)
      if(data.dataValues.token === JSON.stringify(params.token)){
        callback(true, 'Valid token');
      }else{
        callback(false, 'Invalid token');
      }
    }else{
      callback(false, 'Invalid username');
    }
  })
}
//
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImNrdWgkMmEkMTAkOUZjTjZzNy5pWmcyRlV1eUxSSmJELiI.7UGBfVQ8dvvMR-ehd9gwQyee3axz-aEPjsqEs9RTQpM
//
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImNrdWgkMmEkMTAkOUZjTjZzNy5pWmcyRlV1eUxSSmJELiI.7UGBfVQ8dvvMR-ehd9gwQyee3axz-aEPjsqEs9RTQpM

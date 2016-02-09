var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

exports.getUser = function (callback, params) {
  console.log(params.token)
  db.User.find({where: {token: params.token}, attributes: ['username', 'firstname', 'lastname', 'email']})
  .then(function (data) {
    if(data){
      callback(data);
    } else {
      callback(false, 'Invalid token');
    }
  })
}

exports.changeProfileImage = function (callback, params) {
  db.User.find({where: {username: params.username}})
  .then(function (data) {
    if(data){
      callback()
    } else {
      callback(false, 'Image failed to upload')
    }
  })
}

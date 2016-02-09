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
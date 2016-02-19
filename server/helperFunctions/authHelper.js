var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

exports.getToken = function (callback, params) {
  db.User.find({where: {token: params.token}, attributes: ['token']})
  .then(function (data) {
    if(data){
      callback(true, 'Valid token');
    }else{
      callback(false, 'Invalid token');
    }
  })
}

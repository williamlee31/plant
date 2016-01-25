var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

exports.getToken = function (callback, params) {
  console.log('inside helper getToken: ', params)
  db.User.find({where: {username: params.username}, attributes: ['token']})
  .then(function (data) {
    if(data){
      db.User.update({token: param})
      .then(function() {
        callback(true, 'Token saved');
      })
    }else{
      callback(false, 'Invalid username');
    }
  })
}

var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

exports.getToken = function (callback, params) {
  console.log('inside helper getToken: ', params)
  db.User.find({where: {token: params.token}, attributes: ['token']})
  .then(function (data) {
    if(data){
      console.log('+++line10 data.dataValues.token: ', data.dataValues.token)
      console.log('+++line11 params.token: ', params.token)
      callback(true, 'Valid token');
    }else{
      callback(false, 'Invalid token');
    }
  })
}

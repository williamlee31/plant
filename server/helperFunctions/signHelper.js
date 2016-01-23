var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

var comparePass = function (userPass, dataPass, callback) {
  bcrypt.compare(userPass, dataPass, function (err, loggedin) {
		if(err) console.log(err);
    callback(loggedin);
	})
}

var cryptPass = function (password, callback){
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
       callback(hash);
    });
  })
}

exports.signIn = function (callback, params) {
    db.User.find({where: {username: params.username}})
    .then(function (data) {
      if(data){
        comparePass(params.password,data.password,function (response) {
          if(response){
            db.User.find({where: {email: params.email}, attributes: ['username', 'firstname', 'lastname']})
            .then(function (data) {
              var token = jwt.encode(params.email, 'secret');
              data.dataValues.token = token;
              callback(data);
            })
          }else{
            callback(response);
          }
        })
      }else{
        callback(false, 'Invalid Username');
      }
    })
}

exports.signUp = function (callback, params) {
  db.User.find({where: {username: params.username}})
  .then(function (data) {
    if(!data){
      db.User.find({where: {email: params.email}})
      .then(function (data) {
        if(!data){
          cryptPass(params.password, function (hash) {
            db.User.bulkCreate([{
              username: params.username,
              email: params.email,
              password: hash,
              firstname: params.firstname,
              lastname: params.lastname
            }])
            .then(function () {
              return db.User.find({where: {email: params.email}, attributes: ['username', 'firstname','lastname']});
            }).then(function (userData) {
              console.log('+++line 57: ', userData);
              var token = jwt.encode(params.email, 'secret');
              userData.dataValues.token = token;
              callback(userData);
            })
          })
        }else{
          callback(false, 'Email exists');
        }
      })
    }else{
      callback(false, 'Username exists');
    }
  })
}

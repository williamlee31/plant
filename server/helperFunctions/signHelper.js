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

var cryptToken = function (username, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    var token = jwt.encode(username + salt, 'secret');
    callback(JSON.stringify(token));
  })
}

exports.signIn = function (callback, params) {
    db.User.find({where: {username: params.username}})
    .then(function (data) {
      if(data){
        comparePass(params.password,data.password,function (response) {
          if(response){
            db.User.find({where: {username: params.username}, attributes: ['id', 'username', 'firstname', 'lastname', 'email']})
            .then(function (data) {
              cryptToken(params.username, function (storedToken) {
                data.update({token: storedToken})
                .then(function() {
                  data.dataValues.token = storedToken;
                  delete data.dataValues.id
                  callback(data);
                })
              })
            })
          }else{
            callback(response, 'Invalid password');
          }
        })
      }else{
        callback(false, 'Invalid username');
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
            cryptToken(params.username, function (storedToken) {
              db.User.bulkCreate([{
                username: params.username,
                email: params.email,
                password: hash,
                firstname: params.firstname,
                lastname: params.lastname,
                token: storedToken
              }])
              .then(function () {
                db.User.find({where: {username: params.username}, attributes: ['username', 'firstname', 'lastname', 'token', 'email']})
                .then(function (userData) {
                  callback(userData);
                })
              })
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

exports.logout = function (callback, params) {
  console.log('+++line91 token: ', params.token);
  db.User.find({where: {token: params.token}, attributes: ['id', 'token']})
  .then(function (data) {
    if(data){
      data.update({token: 'NULL'})
      .then(function () {
        callback(true, 'Token deleted');
      })
    }else{
      callback(false, 'Invalid token')
    }

  })
}

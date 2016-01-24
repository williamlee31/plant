var db = require("../db/db.js");
var bcrypt = require('bcrypt');
var jwt  = require('jwt-simple');

var compareKey = function (userKey, dataKey, callback) {
  bcrypt.compare(userKey, dataKey, function (err, matchKey) {
		if(err) console.log(err);
    callback(matchKey);
	})
}

var cryptKey = function (key, callback){
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
       callback(hash);
    });
  })
}

exports.regDevice = function (callback, params) {
  var token = jwt.encode(params.apiKey, 'secret');
  db.Device.find({where: {apiKey: token}})
  .then(function (data) {
    if(!data){
      console.log('Device key is not in database, proceeding.');
      console.log('params: ', params);
      console.log('Trying to check username: ' + params.username + 'inside db');
      db.User.find({where: {username: params.username}})
      .then(function (data) {
        console.log('Found username in database');
        console.log('data from username :', data);
        if(data){
          db.Device.bulkCreate([{
            name: params.name,
            apiKey: token,
            UserId: data.dataValues.id
          }])
          .then(function () {
            callback(true, 'Saved');
          })
        }else{
          callback(false, 'Invalid Username');
        }
      })
    }else{
      callback(false, 'Key already exists');
    }
  })
}

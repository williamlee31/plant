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
      console.log('Params: ', params);
      console.log('Trying to check username: ' + params.username + ' (inside db)');
      db.User.find({where: {username: params.username}})
      .then(function (data) {
        console.log('Found username in database');
        if(data){
          db.Device.bulkCreate([{
            name: params.name,
            apiKey: token,
            zipCode: params.zipCode,
            UserId: data.dataValues.id
          }])
          .then(function () {
            callback(true, 'Saved device in database');
          })
        }else{
          callback(false, 'Invalid username');
        }
      })
    }else{
      callback(false, 'Key already exists');
    }
  })
}

exports.getDevices = function(callback, params) {
  var username = params.username;
  console.log(username);
  db.User.find({where: {username: username}})
  .then(function (data) {
    if(data){
      var userid = data.dataValues.id;
      db.Device.findAll({where: {UserId: userid}, attributes: ['name', 'apiKey', 'zipCode', 'dryTrigger', 'dangerTrigger', 'drenchedTrigger']})
      .then(function (data) {
        if(data){
          // var token = jwt.decode(data.dataValues.apiKey, 'secret');
          var results = [];
          for(var i = 0; i < data.length; i++){
            var token = jwt.decode(data[i].dataValues.apiKey, 'secret');
            data[i].dataValues.apiKey = token;
            results.push(data[i].dataValues);
          }
          callback(results);
        } else {
          callback(data, 'No devices')
        }
      })
    } else {
      callback(data, 'Invalid username');
    }
  })
}

exports.updateDeviceTrigger = function(callback, params) {
  var username = params.username;
  var token = jwt.encode(params.apiKey, 'secret');
  var triggerName = params.triggerName;
  var triggerObject = {};
  var trig;

  if(triggerName === 'dryTrigger'){
    trig = 'dry alert';
  } else if (triggerName === 'drenchedTrigger'){
    trig = 'drenched alert';
  } else if (triggerName === 'dangerTrigger'){
    trig = 'danger alert';
  }

  db.User.find({where: {username: username}})
  .then(function (data) {
    if(data){
      var userid = data.dataValues.id;
      db.Device.find({where: {apiKey: token, UserId: userid}})
      .then(function (device) {
        if(device){
          if(device.dataValues[triggerName]){
            console.log('+++line98: trigger is currently true, proceeding to change to false');
            triggerObject[triggerName] = false;
            device.update(triggerObject);
            callback(true, device.dataValues.name + "'s " + trig + " switched to off!");
          } else if (!device.dataValues[triggerName]){
            console.log('+++line103: trigger is currently false, proceeding to change to true');
            triggerObject[triggerName] = true;
            device.update(triggerObject);
            callback(true, device.dataValues.name + "'s " + trig + " switched to on!");
          }
        } else {
          callback(false, 'No device to update')
        }
      })
    } else {
      callback(false, 'Invalid username')
    }
  })
}

exports.deleteDevice = function(callback, params) {
  var username = params.username;
  var devicename = params.devicename;
  db.User.find({where: {username: username}})
  .then(function (data) {
    if(data){
      var userid = data.dataValues.id;
      db.Device.find({where: {name: devicename, UserId: userid}})
      .then(function (data) {
        console.log('Data from device find: ', data);
        if(data){
          data.destroy();
          callback(true, 'Device deleted');
        } else {
          callback(false, 'No devices');
        }
      })
    } else {
      callback(false, 'Invalid username');
    }
  })
}

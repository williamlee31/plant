var db = require("../db/db.js");
var nodemailer = require('nodemailer');
var jwt  = require('jwt-simple');


var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bloom.notification@gmail.com', // Your email id
    pass: 'MKS29.dcwJS' // Your password
  }
});

exports.welcomeMessage = function (callback, params) {
  var user = params.firstname;
  var email = params.email;
  var welcomeEmail = {
    from: 'bloom.notification@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Welcome to Bloom', // Subject line
    html: 'Hello there ' + user + '!<br><br>Thanks for signing up on Bloom!<br><br>Register a device on our application and begin monitoring the health of your plants today!<br><br>Cheers,<br>The Bloom Team' // You can choose to send an HTML body instead
  };
  transporter.sendMail(welcomeEmail, function(error, data){
    if(error){
      console.log(error);
      callback(false, 'Welcome message not sent.')
    }else{
      callback(true, 'Welcome message sent. ' + data.response)
    };
  });
}

exports.triggerCallback = function (callback, params) {
  var token = jwt.encode(params.device.id, 'secret');
  var trigger = params.trigger;
  var devicename = params.device.name
  db.Device.find({where: {apiKey: token}})
  .then(function (device) {
    if(device){
      var userid = device.dataValues.id;
      var name = device.dataValues.name;
      db.User.find({where: {id: userid}, attributes: ['firstname', 'email']})
      .then(function (user) {
        if(user){
          var email = user.dataValues.email;
          var firstname = user.dataValues.firstname;

          var welcomeEmail = {
            from: 'bloom.notification@gmail.com', // sender address
            to: email, // list of receivers
            subject: trigger + ' notification for ' + devicename, // Subject line
            html: 'Hello there ' + firstname + '!<br><br>One of your plants, ' + devicename + ', has triggered an alert for ' + trigger + '. Please check your plant out ASAP to keep it in healthy condition!<br><br>Cheers,<br>The Bloom Team'
          }
          transporter.sendMail(welcomeEmail, function(error, data){
            if(error){
              console.log(error);
              callback(false, 'Alert notification not sent.');
            }else{
              callback(true, 'Alert notification sent. ' + data.response);
            };
          });
        } else {
          callback(false, 'Invalid user');
        }
      })
    } else {
      callback(false, 'Invalid device');
    }
  })
}

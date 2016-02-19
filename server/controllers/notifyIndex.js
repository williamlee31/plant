var models = require('../models/notifyIndex.js');

module.exports = {
  welcome: {
    get: function (req, res) {

    },
    post: function (req, res) {
      models.welcome.post(function (data, msg) {
        if(data){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      }, req.body);
    }
  },
  alert: {
    get: function (req, res) {

    },
    post: function (req, res) {
      models.alert.post(function (data, msg) {
        if(data){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      }, req.body);
    }
  }
}

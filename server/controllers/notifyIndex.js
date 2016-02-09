var models = require('../models/notifyIndex.js');

module.exports = {
  welcome: {
    get: function (req, res) {
      console.log('+++line6: inside controllers get welcome notifyIndex.js')

    },
    post: function (req, res) {
      console.log('+++line10: inside controllers post welcome notifyIndex.js')
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
      console.log('+++line22: inside controllers get alert notifyIndex.js')

    },
    post: function (req, res) {
      console.log('+++line26: inside controllers post alert notifyIndex.js')
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

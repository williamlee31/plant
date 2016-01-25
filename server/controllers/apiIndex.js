var models = require('../models/apiIndex.js');
var url = require('url');

module.exports = {
  users: {
    get: function (req, res) {
      console.log('+++line6: inside controllers get apiIndex.js');
      models.users.get(function (data) {
        res.send(data);
      })
    },
    post: function (req, res) {
      console.log('+++line12: inside controllers post apiIndex.js');
      models.users.post(function (data) {
        res.send(data);
      })
    }
  },
  devices: {
    get: function (req, res) {
      console.log('+++line20: inside controllers get devices apiIndex.js');
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      models.devices.get(function (data, msg) {
        if(data){
          res.send(data);
        } else {
          res.status(404).send(msg);
        }
      }, query)
    },
    post: function (req, res) {
      console.log('+++line26: insde controllers post devices apiIndex.js');
      models.devices.post(function (valid, msg) {
        if(valid){
          res.send(msg);
        }else{
          res.status(404).send(msg);
        }
      }, req.body)
    }
  }
}

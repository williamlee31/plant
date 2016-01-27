var models = require('../models/apiIndex.js');
var url = require('url');

module.exports = {
  users: {
    get: function (req, res) {
      console.log('+++line7: inside controllers get users apiIndex.js');
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      models.users.get(function (data, msg) {
        if(data){
          res.send(data);
        }else{
          res.status(404).send(msg);
        }
      }, query)
    },
    post: function (req, res) {
      console.log('+++line19: inside controllers post users apiIndex.js');
      models.users.post(function (data) {
        res.send(data);
      })
    },
    delete: function (req, res) {
      console.log('+++line25: inside controllers delete users apiIndex.js');
      models.users.delete(function (data){

      })
    }
  },
  devices: {
    get: function (req, res) {
      console.log('+++line33: inside controllers get devices apiIndex.js');
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
      console.log('+++line45: insde controllers post devices apiIndex.js');
      models.devices.post(function (valid, msg) {
        if(valid){
          res.send(msg);
        }else{
          res.status(404).send(msg);
        }
      }, req.body)
    },
    delete: function (req, res) {
      console.log('+++line55: inside controllers delete devices apiIndex.js');
      models.devices.delete(function (valid, msg) {
        if(valid){
          res.send(msg)
        } else {
          res.status(404).send(msg)
        }
      }, req.body)
    }
  }
}

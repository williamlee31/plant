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
    put: function (req, res) {
      console.log('+++line25: inside controllers put users apiIndex.js');
      models.users.put(function (data){

      })
    },
    delete: function (req, res) {
      console.log('+++line31: inside controllers delete users apiIndex.js');
      models.users.delete(function (data){

      })
    }
  },
  devices: {
    get: function (req, res) {
      console.log('+++line38: inside controllers get devices apiIndex.js');
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
      console.log('+++line51: inside controllers post devices apiIndex.js');
      console.log('request body inside post device controller :', req.body);
      models.devices.post(function (valid, msg) {
        if(valid){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      }, req.body)
    },
    put: function (req, res) {
      console.log('+++line62: inside controllers put devices apiIndex.js');
      models.devices.put(function (valid, msg){
        if(valid){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      },req.body)
    },
    delete: function (req, res) {
      console.log('+++line55: inside controllers delete devices apiIndex.js');
      console.log('request body inside delete device controller :', req.body);
      models.devices.delete(function (valid, msg) {
        if(valid){
          res.send(msg)
        } else {
          res.status(404).send(msg)
        }
      }, req.body)
    }
  },
  triggers: {
    get: function (req, res) {
      console.log('+++line85: inside controllers get triggers apiIndex.js');
    },
    post: function (req, res) {
      console.log('+++line88: inside controllers post triggers apiIndex.js');
      models.triggers.post(function(data, msg){
        if(data){
          res.send(data);
        } else {
          res.status(404).send(msg);
        }
      }, req.body)
    },
    put: function (req, res) {
      console.log('+++line91: inside controllers put ustriggersers apiIndex.js');
      models.triggers.put(function (valid, msg){
        if(valid){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      }, req.body)
    },
    delete: function (req, res) {
      console.log('+++line97: inside controllers delete triggers apiIndex.js');
    }
  }
}

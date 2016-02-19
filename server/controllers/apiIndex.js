var models = require('../models/apiIndex.js');
var url = require('url');

module.exports = {
  users: {
    get: function (req, res) {
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
      models.users.post(function (data) {
        res.send(data);
      })
    },
    put: function (req, res) {
      models.users.put(function (data){

      })
    },
    delete: function (req, res) {
      models.users.delete(function (data){

      })
    }
  },
  devices: {
    get: function (req, res) {
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
      models.devices.post(function (valid, msg) {
        if(valid){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      }, req.body)
    },
    put: function (req, res) {
      models.devices.put(function (valid, msg){
        if(valid){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      },req.body)
    },
    delete: function (req, res) {
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
    },
    post: function (req, res) {
      models.triggers.post(function(data, msg){
        if(data){
          res.send(data);
        } else {
          res.status(404).send(msg);
        }
      }, req.body)
    },
    put: function (req, res) {
      models.triggers.put(function (valid, msg){
        if(valid){
          res.send(msg);
        } else {
          res.status(404).send(msg);
        }
      }, req.body)
    },
    delete: function (req, res) {
    }
  }
}

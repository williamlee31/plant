var models = require('../models/signIndex.js');
var url = require('url');

module.exports = {
  signin: {
    get: function (req, res) {
      models.signin.get(function (data) {
        res.send(data);
      }, req.body);
    },
    post: function (req, res) {
      models.signin.post(function (data, msg) {
        if(data){
          res.send(data);
        } else {
          res.status(404).send(msg);
        }
      }, req.body)
    }
  },
  signup: {
    get: function (req, res) {
      models.signup.get(function (data) {
        res.send(data);
      })
    },
    post: function (req, res) {
      models.signup.post(function (data, msg) {
        if(data){
          res.send(data);
        } else {
          res.status(404).send(msg);
        }
      }, req.body);
    }
  },
  logout: {
    get: function (req, res) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      models.logout.get(function (data, msg) {
        if(data){
          res.send(msg)
        }else{
          res.status(404).send(msg);
        }
      }, query)
    },
    post: function (req, res) {
      models.logout.post(function (data) {
        res.send(data);
      })
    }
  },
  auth: {
    get: function (req, res) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      models.auth.get(function (data, msg) {
        if(data){
          res.send(msg);
        }else{
          res.status(404).send(msg);
        }
      }, query)
    },
    post: function (req, res) {
      models.auth.post(function (data) {
        res.send(data);
      })
    }
  }
}

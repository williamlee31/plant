var models = require('../models/signIndex.js');
var url = require('url');

module.exports = {
  signin: {
    get: function (req, res) {
      console.log('+++line6: inside controllers get signIndex.js');
      models.signin.get(function (data) {
        res.send(data);
      }, req.body);
    },
    post: function (req, res) {
      console.log('+++line12: inside controllers post signIndex.js');
      models.signin.post(function (data, message) {
        if(data){
          res.send(message);
        } else {
          res.status(404).send(message);
        }
      }, req.body)
    }
  },
  signup: {
    get: function (req, res) {
      console.log('+++line20: inside controllers get signIndex.js');
      models.signup.get(function (data) {
        res.send(data);
      })
    },
    post: function (req, res) {
      console.log('+++line26: inside controllers post signIndex.js');
      models.signup.post(function (data, message) {
        if(data){
          res.send(message);
        } else {
          res.status(404).send(message);
        }
      }, req.body);
    }
  },
  logout: {
    get: function (req, res) {
      console.log('+++line34: inside controllers get signIndex.js');
      models.logout.get(function (data) {
        res.send(data);
      })
    },
    post: function (req, res) {
      console.log('+++line40: inside controllers post signIndex.js');
      models.logout.post(function (data) {
        res.send(data);
      })
    }
  },
  auth: {
    get: function (req, res) {
      console.log('+++line56: inside controllers get signIndex.js');
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      console.log(query);
      models.auth.get(function (data, message) {
        if(data){
          res.send(message);
        }else{
          res.status(404).send(message);
        }
      }, query)
    },
    post: function (req, res) {
      console.log('+++line56: inside controllers post signIndex.js');
      models.auth.post(function (data) {
        res.send(data);
      })
    }
  }
}

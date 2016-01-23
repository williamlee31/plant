var models = require('../models/signIndex.js');

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
      models.signin.post(function (data) {
        if(data){
          res.send(data);
        } else {
          res.status(404).send(data);
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
      models.signup.post(function (data) {
        if(data){
          res.send(data);
        } else {
          res.status(404).send(data);
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
  }
}

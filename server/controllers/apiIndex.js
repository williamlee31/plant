var models = require('../models/apiIndex.js');

module.exports = {
  users: {
    get: function (req, res) {
      console.log('+++line6: inside controllers get apiIndex.js')
      models.users.get(function(data) {
        res.send(data);
      })
    },
    post: function (req, res) {
      console.log('+++line12: inside controllers post apiIndex.js')
      models.users.post(function(data) {
        res.send(data);
      })
    }
  }
}
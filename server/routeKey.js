var controllers = require('./controllers/keyIndex.js');
var router = require('express').Router();

router.route("/").get(controllers.get)

module.exports = router;

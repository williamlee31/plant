var Sequelize = require("sequelize");

var sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('plant', 'root', null)
}

var User = sequelize.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  profilePicture: Sequelize.BLOB('long'),
},
  createdAt: false,
  updatedAt: false
});

var Device = sequelize.define("Device", {
  apiKey: Sequelize.STRING
});


User.hasMany(Device);

User.sync();
Device.sync();

exports.User = User;
exports.Device = Device;
exports.sequelize = sequelize;

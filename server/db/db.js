var Sequelize = require("sequelize");

var sequelize = null;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize('plant', 'root', null)
}

var User = sequelize.define("User", {
  username: Sequelize.STRING,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  token: Sequelize.STRING,
  profilePicture: Sequelize.BLOB('long'),
},{
  createdAt: false,
  updatedAt: false
});

var Device = sequelize.define("Device", {
  name: Sequelize.STRING,
  apiKey: Sequelize.STRING,
  zipCode: Sequelize.STRING,
  dangerTrigger: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
  dryTrigger: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
  drenchedTrigger: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
});


User.hasMany(Device);
Device.belongsTo(User);

User.sync().then(function(){
  Device.sync();
});

exports.User = User;
exports.Device = Device;
exports.sequelize = sequelize;

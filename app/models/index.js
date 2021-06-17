const dbConfig = require("../config/db.config.js");

const Profile = require("./profileModel.js");
const User = require("./userModel.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, Sequelize);
db.profiles = require("./profileModel.js")(sequelize, Sequelize);

db.users.hasMany(db.profiles, { as: "profiles" });
db.profiles.belongsTo(db.users, {
  foreignKey: "userId",
  as: "userOwnerId",
});


module.exports = db;
const db = require("./index.js");
const bcrypt = require('bcryptjs')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN
      }  
    });

    User.beforeCreate(async (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    });

    User.prototype.validPassword = function (password) {
      return bcrypt.compareSync(password, this.password);
  };

    return User;
  };

  
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const { generateToken } = require('../utils/generateToken.js');

exports.registerUser = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
  
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
      };

      const token = generateToken(req.body.email);
    
      User.create(user)
        .then(data => {
          res.send({ data, token });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
};

exports.findAllUsers= (req, res) => {
  
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  };

exports.authUser = (req, res) => {
    const { email, password } = req.body;
  
    User.find({where: {
      email: email
      }})
      .then(user => {
        if(!user) {
          throw Error('Invalid email or password');
        }
        if(user.validPassword(password)) {
          return user;
        }
        else {
          throw Error('Invalid email or password');
        }
      })
      .then(data => {
        res.send({
          data, 
          token: generateToken(data.email)
      })})
      .catch(err => {
        let msg = err ? err.message : "Error retrieving User";
        res.status(500).send({
          message: msg
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User"
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User"
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        if(!data) {
            throw new Error();
        }
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user"
        });
      });
  };

const db = require("../models");
const Profile = db.profiles;
const Op = db.Sequelize.Op;

// Create a new profile
// POST /api/profiles
// Public route
exports.create = (req, res) => {
    if (!req.body.name || !req.body.gender || !req.body.birthdate || !req.body.city || !req.body.userId) {
        res.status(400).send({
          message: "Please fill in all the fields!",
          
        });
        return;
      }
  
      const profile = {
        name: req.body.name,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        city: req.body.city,
        userId: req.body.userId
      };
    
      Profile.create(profile)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the profile."
          });
        });
};

// Create a new profile
// GET /api/profiles
// Private route
exports.findAllByUserId = (req, res) => {
    Profile.findAll({where: { userId: req.params.userId}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving profiles."
        });
      });
  };

  exports.findAllProfiles = (req, res) => {
    Profile.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving profiles."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Profile.findByPk(id)
      .then(data => {
        if(!data) {
            throw new Error();
        }
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving profile with id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Profile.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Profile was updated successfully!"
          });
        } else {
          res.send({
            message: `Cannot update profile`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating profile"
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Profile.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Profile was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete profile!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete profile"
        });
      });
  };

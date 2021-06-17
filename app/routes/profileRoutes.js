module.exports = app => {
    const verifyToken = require('../middleware/authJwt.js');

    const profiles = require("../controllers/profileController.js");

    const { validateProfileForm } = require("../middleware/validateProfileForm.js");
  
    var router = require("express").Router();
  
    router.post("/", 
      verifyToken, 
      validateProfileForm, 
      profiles.create
    );

    router.get("/:userId", verifyToken, profiles.findAllByUserId);

    router.get("/", verifyToken, profiles.findAllProfiles);
  
    router.put("/:id", verifyToken, validateProfileForm, profiles.update);
  
    router.delete("/:id", verifyToken, profiles.delete);
  
    app.use('/api/profiles', router);
  };
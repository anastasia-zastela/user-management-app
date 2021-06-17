
module.exports = app => {
    const verifyToken = require('../middleware/authJwt.js');

    const { validateUserForm } = require('../middleware/validateUserForm.js');

    const { validateSignIn } = require('../middleware/validateSignIn');

    const checkDuplicateUsernameOrEmail = require('../middleware/checkDuplicateUsernameOrEmail');

    const users = require("../controllers/userController.js");
  
    var router = require("express").Router();
  
    router.post("/", 
      validateUserForm,
      checkDuplicateUsernameOrEmail, 
      users.registerUser);

    router.get("/", verifyToken, users.findAllUsers);

    router.post("/login", validateSignIn,  users.authUser);
  
    router.put("/:id", verifyToken, validateUserForm, users.update);
  
    router.delete("/:id", verifyToken, users.delete);
  
    app.use('/api/users', router);
  };
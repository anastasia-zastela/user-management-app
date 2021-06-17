const validateUserForm = (req, res, next) => {

    if (!req.body.username.trim()) {
        return res.status(400).json({ message: 'Username required'});
    }
    else if (!/^[A-Za-z]+/.test(req.body.username.trim())) {
        return res.status(400).json({ message:'Enter a valid name'});
    }
  
    if (!req.body.email) {
        return res.status(400).json({ message: 'Email required'});
    } else if (!/\S+@\S+\.\S+/.test(req.body.email)) {
      return res.status(400).json({ message:'Email address is invalid'});
    }
    if (!req.body.password) {
        return res.status(400).json({ message: 'Password is required'});
    } else if (req.body.password.length < 6) {
        return res.status(400).json({ message:'Password needs to be 6 characters or more'});
    }

    next();
}

module.exports = { 
    validateUserForm
}
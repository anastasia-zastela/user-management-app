const validateUserFormToUpdate = (req, res, next) => {

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

    next();
}

module.exports = { 
    validateUserFormToUpdate
}
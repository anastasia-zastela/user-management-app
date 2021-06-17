const validateSignIn = (req, res, next) => {

    if (!req.body.email) {
        return res.status(400).json({ message: 'Email required'});
    }
  
    if (!req.body.password) {
        return res.status(400).json({ message: 'Password required'});
    } 
    next();
}

module.exports = { 
    validateSignIn
}
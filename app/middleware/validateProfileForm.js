const validateProfileForm = (req, res, next) => {

    if (!req.body.name.trim()) {
        return res.status(400).json({ message:'Username required'});
    }
    else if (!/^[A-Za-z]+/.test(req.body.name.trim())) {
        return res.status(400).json({ message:'Enter a valid name'})
    }

    if (!req.body.birthdate) {
        return res.status(400).json({ message:'Date required'});
    }

    if (!req.body.city) {
        return res.status(400).json({ message:'City is required'});
    }

    next();
}

module.exports = { 
    validateProfileForm
}
const jwt = require('jsonwebtoken');
const config = require("../config/auth.config.js");

const generateToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });
};

module.exports = { generateToken };

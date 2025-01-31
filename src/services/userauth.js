require('dotenv').config();
const jwt = require("jsonwebtoken");
 
const createTokenForUser  = (user) => {
    const payload = {
        firstName:user.firstName,
        _id: user._id,
        emailId: user.emailId,
        photoURL: user.photoURL,
    };

    const token = jwt.sign(payload, process.env.secrate_key_JWT, { expiresIn: '1d' }); 
    return token;
};

const validateToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.secrate_key_JWT);
        return payload;
        
    } catch (error) {
        throw new Error("Invalid token"); 
    }
};

module.exports = {
    createTokenForUser ,
    validateToken,
};
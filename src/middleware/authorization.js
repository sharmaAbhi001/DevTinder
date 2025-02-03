const { validateToken } = require("../services/userauth");

const checkForAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
       
        
        if (!tokenCookieValue) {
            return next();
        }
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            return res.status(401).error("Token validation error:", error.message);
        }
        return next(); 
    };
};

module.exports = checkForAuthenticationCookie;

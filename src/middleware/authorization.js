const { validateToken } = require("../services/userauth");

const checkForAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
       
        
        if (!tokenCookieValue) {
            // If no token is found, proceed to the next middleware/route
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            console.error("Token validation error:", error.message);
        }
        
        return next(); 
    };
};

module.exports = checkForAuthenticationCookie;

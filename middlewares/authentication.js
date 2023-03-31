const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authConfig = require('../config/authConfig');

// This is an authentication middleware function that checks for the presence and validity of a JSON Web Token (JWT) in the request
module.exports = async function authentication(req, res, next) {
    // Retrieve the token from the 'authorization' header in the request
    const token = req.headers['authorization'];

    // If there's no token, return a 401 status code with an error message
    if (!token) {
        return res.status(401).json({ error: 'No token provided.' });
    }

    try {
        // Verify the JWT using the secret key and extract the decoded payload
        const decoded = jwt.verify(token, authConfig.secret);
        
        // Find the user in the database using the user's UUID from the decoded payload
        const user = await User.findByPk(decoded.user_uuid);

        // If the user is not found, return a 404 status code with an error message
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Attach the user to the request object for further processing in the next middleware or route handler
        req.user = user;
        
        // Call the next middleware or route handler
        next();
    } catch (err) {
        // If the token verification fails, return a 401 status code with an error message
        return res.status(401).json({ error: 'Failed to authenticate token.' });
    }
};

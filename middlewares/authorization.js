// This is an authorization middleware function that checks if the authenticated user has the required role(s) to access a protected route
module.exports = function authorization(roles) {
    // The 'roles' parameter is an array of allowed roles for the route

    // Return a middleware function that checks if the user's role is included in the allowed roles
    return function (req, res, next) {
        // Check if the user's role is included in the 'roles' array
        if (roles.includes(req.user.role)) {
            // If the user's role is allowed, proceed to the next middleware or route handler
            next();
        } else {
            // If the user's role is not allowed, return a 403 status code with an error message
            res.status(403).json({ error: 'Insufficient permissions.' });
        }
    };
};
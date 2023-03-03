// Importing the User model from the index file in the models directory
const {
    User
} = require('../models/index.js');

// Importing the JSON web token package
const jwt = require('jsonwebtoken');

// Getting the secret key for the JSON web token from the environment variables
const authConfig = require('../config/authConfig');

// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');

exports.registerNewUser = async (req, res) => {

    // Extracting the required fields from the request body
    const {
        username,
        email,
        password
    } = req.body;

    try {
        // Creating a new user in the database
        const user = await User.create({
            username,
            email,
            password
        });

        // Creating a JSON web token using the user's ID and the secret key
        const token = jwt.sign({
            id: user.id
        }, authConfig.secret, {
            expiresIn: authConfig.expiresIn
        });

        // Returning the user and token to the client
        res.status(201).json({
            user,
            token
        });
    } catch (error) {
        // If an error occurs during the registration process, returning the error message to the client
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};


// Function to log in a user
exports.loginUser = async (req, res) => {

    // Extracting the email and password from the request body
    const {
        email,
        password
    } = req.body;

    // Defining the validPassword method on the User model
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    try {
        // Finding the user with the given email in the database
        const user = await User.findOne({
            where: {
                email
            }
        });

        // If the user is not found in the database or the password is incorrect, throwing an error
        if (!user || !user.validPassword(password)) {
            throw new Error('Invalid login');
        }

        // Creating a JSON web token using the user's ID and the secret key
        const token = jwt.sign({
            user_uuid: user.uuid
        }, authConfig.secret, {
            expiresIn: authConfig.expiresIn
        });

        // Returning the token to the client
        res.status(200).json({
            user_uuid: user.uuid,
            email: user.email,
            accessToken: token
        });

    } catch (error) {
        // If an error occurs during the login process, returning the error message to the client
        console.log(error);
        res.status(401).json({
            error: error.message
        });
    };
};
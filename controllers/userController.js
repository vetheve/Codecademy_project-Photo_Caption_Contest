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

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.findAll({
            attributes: [
                'id',
                'uuid',
                'username',
                'email'
            ]
        });

        res.status(200).json({
            users
        });
      
    } catch (error) {
        // If an error occurs during the registration process, returning the error message to the client
        console.log(error);
        res.status(404).json({
            error: error.message
        });
    }
};

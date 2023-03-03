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
        // Retrieving all users from the database using the User model, and selecting only specific attributes to return
        const users = await User.findAll({
            attributes: [
                'id',
                'uuid',
                'username',
                'email'
            ]
        });
    
        // Returning a success response to the client, with the retrieved users
        res.status(200).json({
            users
        });
      
    } catch (error) {
        // If an error occurs during the retrieval process, logging the error to the console and returning an error response to the client
        console.log(error);
        res.status(404).json({
            error: error.message
        });
    }
    
};

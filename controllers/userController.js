// Importing the User model from the index file in the models directory
const {
    User, Photo, Caption, Vote 
} = require('../models/index.js');

// Importing the JSON web token package
const jwt = require('jsonwebtoken');

// Getting the secret key for the JSON web token from the environment variables
const authConfig = require('../config/authConfig');

// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');
const vote = require('../models/vote.js');

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
    
       // If user is not found, return a 404 response
       if (!users) {
        return res.status(404).json({
            error: 'Users not found',
        });
    } else {
        // Returning a success response to the client, with the retrieved users
        return res.status(200).json({
            users
        });
    };
      
    } catch (error) {
        // Log any errors to the console
        console.error(error);

        // Return an error response with the error message
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.getUserById = async (req, res) => {

    try {
        // Retrieving a user from the database using the User model, and selecting only specific attributes to return
        const user = await User.findByPk(req.params.uuid, {
            include: [{
                    association: 'photos'
                },
                {
                    association: 'captions'
                },
                {
                    association: 'votes'
                }
            ]
        });

        // If user is not found, return a 404 response
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        } else {
            // Returning a success response to the client, with the retrieved users
            return res.status(200).json({
                user
            });
        };

    } catch (error) {
        // Log any errors to the console
        console.error(error);

        // Return an error response with the error message
        res.status(500).json({
            error: error.message,
        });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const {
            password,
            ...rest
        } = req.body;

        // Retrieve the user instance from the database using the uuid in the request params
        const user = await User.findByPk(req.params.uuid, {});

        // If user is not found, return a 404 response
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        } else {
            // Update the user instance with the request body
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10); // hash password if present in req.body
                await user.update({ password: hashedPassword}, {
                    where: {
                        uuid: req.params.uuid
                    }
                })  
            } else {
                await user.update(rest, {
                    where: {
                        uuid: req.params.uuid
                    }
                })    
            };


            // Return a success response with the updated user object
            return res.status(200).json({
                message: 'User updated',
                user
            });
        };
    } catch (error) {
        // Log any errors to the console
        console.error(error);

        // Return an error response with the error message
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.uuid);
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        await Promise.all([
            Vote.destroy({
                where: {
                    user_id: user.uuid
                }
            }),
            Caption.destroy({
                where: {
                    user_id: user.uuid
                }
            }),
            Photo.destroy({
                where: {
                    user_id: user.uuid
                }
            })
        ]);
        await user.destroy();
        return res.status(204).json({
            message: 'User deleted',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
};


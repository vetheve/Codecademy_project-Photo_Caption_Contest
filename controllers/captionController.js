const {
    User, Photo, Caption, Vote, sequelize 
} = require('../models/index.js');

// Importing the JSON web token package
const jwt = require('jsonwebtoken');

// Getting the secret key for the JSON web token from the environment variables
const authConfig = require('../config/authConfig');

// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');

exports.getAllCaptions = async (req, res) => {
    try {
        // Retrieving all photos from the database using the Caption model, and selecting only specific attributes to return
        const captions = await Caption.findAll({
            attributes: [
                'uuid',
                'text',
                'user_id',
                'photo_id'
            ],
        });

        // If photos are not found, return a 404 response
        if (!captions) {
            return res.status(404).json({
                error: 'Captions not found',
            });
        } else {
            // Returning a success response to the client, with the retrieved captions
            return res.status(200).json({
                captions
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

exports.getCaptionById = async (req, res) => {

    try {
        // Retrieving a caption from the database using the Caption model, and selecting only specific attributes to return
        const caption = await Caption.findByPk(req.params.uuid, {
            include: [{
                    association: 'photo'
                }
            ]
        });

        // If user is not found, return a 404 response
        if (!caption) {
            return res.status(404).json({
                error: 'Caption not found',
            });
        } else {
            // Returning a success response to the client, with the retrieved users
            return res.status(200).json({
                caption
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

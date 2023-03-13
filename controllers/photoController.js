const {
    User, Photo, Caption, Vote, sequelize 
} = require('../models/index.js');

// Importing the JSON web token package
const jwt = require('jsonwebtoken');

// Getting the secret key for the JSON web token from the environment variables
const authConfig = require('../config/authConfig');

// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');

exports.getAllPhotos = async (req, res) => {
    try {
        // Retrieving all photos from the database using the Photo model, and selecting only specific attributes to return
        const photos = await Photo.findAll({
            attributes: [
                'uuid',
                'url',
                'user_id'
            ],
        });

        // If photos are not found, return a 404 response
        if (!photos) {
            return res.status(404).json({
                error: 'Photos not found',
            });
        } else {
            // Returning a success response to the client, with the retrieved photos
            return res.status(200).json({
                photos
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

  exports.getPhotoById = async (req, res) => {

    try {
        // Retrieving a photo from the database using the Photo model, and including the caption association
        const photo = await Photo.findByPk(req.params.uuid, {
            include: [{
                association: 'caption'
            }]
        });

        // If photo is not found, return a 404 response
        if (!photo) {
            return res.status(404).json({
                error: 'Photo not found',
            });
        } else {
            // Retrieving the average vote value for the photo from the Votes table
            const votes = await Vote.findAll({
                attributes: [
                    'photo_id',
                    [sequelize.literal('ROUND(AVG(value), 1)'), 'avg_vote']
                ],
                where: {
                    photo_id: req.params.uuid
                },
                group: ['photo_id']
            });

            // Including the avg_value in the photo object
            photo.dataValues.avg_vote = votes[0].dataValues.avg_vote;

            // Returning a success response to the client, with the retrieved photo and the avg_value
            return res.status(200).json({
                photo,
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

exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByPk(req.params.uuid);
        if (!photo) {
            return res.status(404).json({
                error: 'Photo not found',
            });
        } else {
            await photo.destroy();
            return res.status(204).json({
                message: 'Photo deleted',
            });
        };

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.updatePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByPk(req.params.uuid);
        if (!photo) {
            return res.status(404).json({
                error: 'Photo not found',
            });
        } else {
            await photo.update(req.body, { 
                where: { 
                    uuid: req.params.uuid 
                }
            });
            return res.status(204).json({
                message: 'Photo deleted',
            });
        };

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.uploadNewPhoto = async (req, res) => {

    // Extracting the required fields from the request body
    const {
        url,
        user_id
    } = req.body;

    try {
        // Creating a new photo in the database
        const photo = await Photo.create({
            url,
            user_id,
        });

        // Returning the photo to the client
        res.status(201).json({
            photo
        });
    } catch (error) {
        // If an error occurs during the registration process, returning the error message to the client
        console.log(error);
        res.status(500).json({
            error: error.message
        });
    }
};
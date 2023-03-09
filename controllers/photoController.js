const {
    User, Photo, Caption, Vote 
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

/*
const photos = await Photo.findAll({
    attributes: [
      'uuid',
      'url',
      'user_id',
      [sequelize.fn('SUM', sequelize.col('votes.value')), 'totalVotes'] // add the sum of "value" fields as a virtual attribute
    ],
    include: [
      {
        association: 'captions'
      },
      {
        association: 'votes',
        attributes: [] // exclude other attributes from the "votes" association
      }
    ],
    group: ['Photo.id'] // add a GROUP BY clause to group by Photo.id
  });
  
  // Extract the photos and their total votes
  const result = photos.map(photo => ({
    uuid: photo.uuid,
    url: photo.url,
    user_id: photo.user_id,
    totalVotes: photo.get('totalVotes') || 0 // get the virtual attribute value and set it to 0 if it's undefined
  }));
  
  return res.status(200).json({
    photos: result
  });
  */
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
/*
exports.getPhotoById = async (req, res) => {

  try {
      // Retrieving a user from the database using the User model, and selecting only specific attributes to return
      const photo = await Photo.findByPk(req.params.uuid, {
          include: [
              {
                  association: 'caption'
              },
              {
                  association: 'votes'
              }
          ]
      });

      // If user is not found, return a 404 response
      if (!photo) {
          return res.status(404).json({
              error: 'Photo not found',
          });
      } else {
          // Returning a success response to the client, with the retrieved users
          return res.status(200).json({
              photo
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
*/
/*
exports.getPhotoById = async (req, res) => {
  try {
      const photo = await Photo.findByPk(req.params.uuid, {
          attributes: [
              'uuid',
              'url',
              'user_id',
              [sequelize.fn('AVG', sequelize.col('votes.value')), 'avgVotes'], // Add virtual attribute to get average of all votes for the photo
          ],
          include: [{
                  association: 'caption'
              },
              {
                  association: 'votes', // Include the votes association to enable grouping
                  attributes: []
              }
          ],
          group: ['Photos.uuid', 'votes.photo_id'] // Group by Photos.uuid and Votes.photo_id
      });

      if (!photo) {
          return res.status(404).json({
              error: 'Photo not found'
          });
      }

      const result = {
          uuid: photo.uuid,
          url: photo.url,
          user_id: photo.user_id,
          avgVotes: photo.get('avgVotes') || 0 // Get the virtual attribute value and set it to 0 if it's undefined
      };

      return res.status(200).json({
          photo: result
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({
          error: error.message
      });
  }
};
*/

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
'use strict';

// Importing uuidv4 from the uuid package and Sequelize models.
const {
  v4: uuidv4
} = require('uuid');
const models = require('../models');

module.exports = {
  // The up function is responsible for defining the changes that should be applied to the database schema.
  up: async (queryInterface, Sequelize) => {
      // Retrieve all photos and users from the database using Sequelize models.
      const photos = await models.Photo.findAll();
      const users = await models.User.findAll();

      // Generate random votes for each photo by each user
      for (const photo of photos) {
          for (const user of users) {
              // Generate a random integer between 0 and 5 (inclusive).
              const value = Math.floor(Math.random() * 6);
              // Create a new Vote model instance with a unique identifier, the generated value, and the IDs of the photo and user.
              await models.Vote.create({
                  uuid: uuidv4(),
                  value,
                  photo_id: photo.uuid,
                  user_id: user.uuid,
              });
          }
      }
  },

  // The down function is responsible for undoing the changes made to the database schema by the up function.
  down: async (queryInterface, Sequelize) => {
      // Delete all votes from the Votes table using the bulkDelete function provided by Sequelize.
      return queryInterface.bulkDelete('Votes', null, {});
  }
};


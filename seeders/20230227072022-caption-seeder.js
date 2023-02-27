'use strict';

// Importing uuidv4 from the uuid package and faker for generating fake data.
const {
  v4: uuidv4
} = require('uuid');
const faker = require('faker');

module.exports = {
  // The up function is responsible for defining the changes that should be applied to the database schema.
  up: async (queryInterface, Sequelize) => {
      // Query the database to get a list of photos along with their user ids.
      const photos = await queryInterface.sequelize.query('SELECT uuid, user_id FROM "Photos"');

      // Generate 10 captions by iterating over an array of length 10 using map.
      const captions = [...Array(10)].map((_, index) => ({
          // Generate a unique identifier for each caption.
          uuid: uuidv4(),
          // Generate fake text for each caption using the faker package.
          text: faker.lorem.sentence(),
          // Assign a user id from the photos array to each caption.
          user_id: photos[0][index % photos[0].length].user_id,
          // Assign a photo id from the photos array to each caption.
          photo_id: photos[0][index % photos[0].length].uuid,
          // Assign a creation date for each caption.
          createdAt: new Date(),
          // Assign an update date for each caption.
          updatedAt: new Date()
      }));

      // Insert the captions into the Captions table using the bulkInsert function provided by Sequelize.
      return queryInterface.bulkInsert('Captions', captions);
  },

  // The down function is responsible for undoing the changes made to the database schema by the up function.
  down: async (queryInterface, Sequelize) => {
      // Delete all captions from the Captions table using the bulkDelete function provided by Sequelize.
      return queryInterface.bulkDelete('Captions', null, {});
  }
};
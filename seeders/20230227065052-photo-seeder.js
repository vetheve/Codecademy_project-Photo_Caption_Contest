'use strict';

// Importing uuidv4 from the uuid package and faker for generating fake data.
const {
  v4: uuidv4
} = require('uuid');
const faker = require('faker');

module.exports = {
  // The up function is responsible for defining the changes that should be applied to the database schema.
  up: async (queryInterface, Sequelize) => {
      // Retrieve all user IDs from the Users table using a Sequelize query.
      const users = await queryInterface.sequelize.query('SELECT uuid FROM "Users"');

      // Generate 10 fake photos with a unique identifier, a placeholder image URL, a user ID, and creation/update timestamps.
      const photos = [...Array(10)].map((_, index) => ({
          uuid: uuidv4(),
          url: `http://placeimg.com/640/480/${index + 1}`,
          user_id: users[0][index % users[0].length].uuid,
          createdAt: new Date(),
          updatedAt: new Date()
      }));

      // Insert the generated photos into the Photos table using the bulkInsert function provided by Sequelize.
      return queryInterface.bulkInsert('Photos', photos);
  },

  // The down function is responsible for undoing the changes made to the database schema by the up function.
  down: async (queryInterface, Sequelize) => {
      // Delete all photos from the Photos table using the bulkDelete function provided by Sequelize.
      return queryInterface.bulkDelete('Photos', null, {});
  }
};


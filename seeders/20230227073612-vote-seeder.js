/*'use strict';

// Importing uuidv4 from the uuid package and Sequelize models.
const {
  v4: uuidv4
} = require('uuid');
const { User, Photo, Vote } = require('../models/index.js');

module.exports = {
  // The up function is responsible for defining the changes that should be applied to the database schema.
  up: async (queryInterface, Sequelize) => {
  // Getting all users and photos from the database.
  const users = await User.findAll();
  const photos = await Photo.findAll();

  // Looping through all user-photo combinations and creating a vote for each.
  for (const user of users) {
    for (const photo of photos) {
      // Generating a random vote value between 0 and 5.
      const value = Math.floor(Math.random() * 6);

      // Creating a new vote with the generated values.
      await Vote.create({
        uuid: uuidv4(),
        value,
        photo_id: photo.uuid,
        user_id: user.uuid,
        createdAt: new Date(),
        updatedAt: new Date(),
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
*/

'use strict';

const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Use raw SQL to insert votes for each user-photo combination.
    await queryInterface.sequelize.query(`
      INSERT INTO "Votes" (uuid, value, photo_id, user_id, "createdAt", "updatedAt")
      SELECT
        md5(random()::text || clock_timestamp()::text)::uuid,
        floor(random() * 6),
        "Photos".uuid,
        "Users".uuid,
        now(),
        now()
      FROM "Users", "Photos";
    `, { type: QueryTypes.INSERT });
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all votes from the Votes table using the bulkDelete function provided by Sequelize.
    return queryInterface.bulkDelete('Votes', null, {});
  }
};



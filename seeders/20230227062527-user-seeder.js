'use strict';

// Importing bcrypt for password hashing and uuidv4 for generating unique identifiers.
const bcrypt = require('bcrypt');
const {
    v4: uuidv4
} = require('uuid');

/**

Defining a Sequelize migration for creating and populating the Users table with hashed passwords.
*/
module.exports = {
    // The up function is responsible for defining the changes that should be applied to the database schema.
    up: async (queryInterface, Sequelize) => {
        // Define an array of user objects with plaintext passwords.
        const users = [{
                id: 1,
                uuid: uuidv4(),
                username: 'johndoe',
                email: 'johndoe@example.com',
                password: 'password123'
            },
            {
                id: 2,
                uuid: uuidv4(),
                username: 'janedoe',
                email: 'janedoe@example.com',
                password: 'password456'
            },
            {
                id: 3,
                uuid: uuidv4(),
                username: 'billdoe',
                email: 'billdoe@example.com',
                password: 'password185'
            }
        ];

        // Hash the passwords for each user using bcrypt and replace the plaintext password with the hashed password.
        const hashedUsers = await Promise.all(
            users.map(async user => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);

                return {
                    ...user,
                    password: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            })
        );

        // Insert the hashed user objects into the Users table using the bulkInsert function provided by Sequelize.
        return queryInterface.bulkInsert('Users', hashedUsers);
    },

    // The down function is responsible for undoing the changes made to the database schema by the up function.
    down: async (queryInterface, Sequelize) => {
        // Delete all users from the Users table using the bulkDelete function provided by Sequelize.
        return queryInterface.bulkDelete('Users', null, {});
    }
};

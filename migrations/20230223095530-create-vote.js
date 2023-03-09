'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Votes', {
            id: {
                allowNull: false,
                unique: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            uuid: {
                allowNull: false,
                unique: true,
                primaryKey: true,
                type: Sequelize.UUID,
                onDelete: 'CASCADE'
            },
            value: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            photo_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Photos',
                    key: 'uuid'
                },
                onDelete: 'CASCADE' // cascade deletes to associated vote when a photo is deleted
            },
            user_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'uuid'
                },
                onDelete: 'CASCADE' // cascade deletes to associated vote when a user is deleted
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Votes');
    }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Photos', {
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
            url: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            user_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'uuid'
                },
                onDelete: 'CASCADE' // cascade deletes to associated photos when a user is deleted
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
        await queryInterface.dropTable('Photos');
    }
};

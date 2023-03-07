'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Captions', {
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
                type: Sequelize.STRING,
                onDelete: 'CASCADE'
            },
            text: {
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
                }
            },
            photo_id: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Photos',
                    key: 'uuid'
                }
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
        await queryInterface.dropTable('Captions');
    }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
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
            username: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'user',
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
        await queryInterface.dropTable('Users');
    }
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Caption extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
                Caption.belongsTo(models.Photo, {
                    foreignKey: 'photo_id',
                    as: 'photo',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                })
        }
    }
    Caption.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Text already exists'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: 'Text is required'
                },
                notEmpty: {
                    args: true,
                    msg: 'Text cannot be empty'
                },
                len: {
                    args: [1, 100],
                    msg: 'Text must be between 1 and 100 characters'
                }
            }
        },
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        photo_id: {
            allowNull: false,
            type: DataTypes.UUID,
        },
    }, {
        sequelize,
        modelName: 'Caption',
    });
    return Caption;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Vote extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Vote.belongsTo(models.Photo, {
				foreignKey: 'photo_id',
				as: 'photo',
				onDelete: 'CASCADE'
			}),
            Vote.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
                onDelete: 'CASCADE'
            });
        }
    }
    Vote.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Value is required'
                },
                isInt: {
                    args: true,
                    msg: 'Value must be an integer'
                },
                min: {
                    args: [0],
                    msg: 'Value must be greater than or equal to 0'
                },
                max: {
                    args: [5],
                    msg: 'Value must be less than or equal to 5'
                },
            }
        },
        photo_id: {
            allowNull: false,
            type: DataTypes.UUID,
        },
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
        }
    }, {
        sequelize,
        modelName: 'Vote',
    });
    return Vote;
};
'use strict';

// Import the bcrypt library for password hashing
const {
    Model
} = require('sequelize');

// Import the bcrypt library for password hashing
const bcrypt = require('bcrypt');

// Define a sequelize model for a User
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Photo, {
                    foreignKey: 'user_id',
                    as: 'photos',
                    onDelete: 'CASCADE'
                }),
            User.hasMany(models.Caption, {
                    foreignKey: 'user_id',
                    as: 'captions',
                    onDelete: 'CASCADE'
                }),
            User.hasMany(models.Vote, {
                    foreignKey: 'user_id',
                    as: 'votes',
                    onDelete: 'CASCADE'
                })
        }
    }
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already exists'
            },
            validate: {
                notNull: {
                    args: true,
                    msg: 'Username is required'
                },
                notEmpty: {
                    args: true,
                    msg: 'Username cannot be empty'
                },
                len: {
                    args: [3, 30],
                    msg: 'Username must be between 3 and 30 characters'
                },
                isAlphanumeric: {
                    args: true,
                    msg: 'Username can only contain letters and numbers'
                },
                not: {
                    args: /(;\")?(--|SELECT|INSERT|UPDATE|DELETE|UNION|EXEC|DROP|ALTER)(\s+)/i,
                    msg: 'Password contains invalid characters',
                },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email address'
                },
                notNull: {
                    args: true,
                    msg: 'Email is required'
                },
                notEmpty: {
                    args: true,
                    msg: 'Email cannot be empty'
                },
                max: {
                    args: 50,
                    msg: 'Email is too long'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password cannot be empty',
                },
                len: {
                    args: [8, 75],
                    msg: 'Password must be between 8 and 20 characters long',
                },
                not: {
                    args: /(;\")?(--|SELECT|INSERT|UPDATE|DELETE|UNION|EXEC|DROP|ALTER)(\s+)/i,
                    msg: 'Password contains invalid characters',
                },
            },
        },
    }, {
        sequelize,
        modelName: 'User',
        // Add hooks to run code before or after certain events
        hooks: {
            // Hash the user's password before creating a new user
            beforeCreate: (User) => {
                const salt = bcrypt.genSaltSync(10);
                User.password = bcrypt.hashSync(User.password, salt);
            }
        },
    });
    return User;
};
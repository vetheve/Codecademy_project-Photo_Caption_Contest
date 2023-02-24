'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });
    }
  }
  Photo.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'URL already exists'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'URL is required'
        },
        notEmpty: {
          args: true,
          msg: 'URL cannot be empty'
        },
        isUrl: {
          args: true,
          msg: 'URL is not valid'
        },
        len: {
          args: [10, 255],
          msg: 'URL must be between 10 and 255 characters'
        }
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
      }
    },    
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
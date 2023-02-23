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
    }
  }
  Photo.init({
    ulid_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};
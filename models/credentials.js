'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  credentials.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'credentials',
    underscored: true,
    paranoid: true
  });
  return credentials;
};
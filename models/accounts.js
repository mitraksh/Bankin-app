'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  accounts.init({
    acc_name: DataTypes.STRING,
    cust_id: DataTypes.INTEGER,
    cust_name: DataTypes.STRING,
    bank_id: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'accounts',
    underscored: true,
  });
  return accounts;
};
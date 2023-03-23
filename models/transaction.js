'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init({
    cust_id: DataTypes.INTEGER,
    to_cust_id: DataTypes.INTEGER,
    acc_id: DataTypes.INTEGER,
    to_acc_id: DataTypes.INTEGER,
    bank_id: DataTypes.INTEGER,
    to_bank_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    tx_type: DataTypes.STRING,
    tx_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
    underscored: true,
  });
  return transaction;
};
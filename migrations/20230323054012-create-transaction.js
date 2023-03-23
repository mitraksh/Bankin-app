'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cust_id: {
        type: Sequelize.INTEGER
      },
      to_cust_id: {
        type: Sequelize.INTEGER
      },
      acc_id: {
        type: Sequelize.INTEGER
      },
      to_acc_id: {
        type: Sequelize.INTEGER
      },
      bank_id: {
        type: Sequelize.INTEGER
      },
      to_bank_id: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      tx_type: {
        type: Sequelize.STRING
      },
      tx_date: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
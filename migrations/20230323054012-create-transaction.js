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
        allowNull: false,
        type: Sequelize.INTEGER
      },
      to_cust_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      acc_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      to_acc_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      bank_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      to_bank_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tx_type: {
        allowNull: false,
        type: Sequelize.STRING
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
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
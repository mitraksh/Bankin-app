'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      acc_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cust_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cust_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bank_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      balance: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('accounts');
  }
};
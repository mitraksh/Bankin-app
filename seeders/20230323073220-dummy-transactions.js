'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('transactions',[       
      {
        id: 1,
        cust_id: 1,
        to_cust_id: 2,
        acc_id: 1,
        to_acc_id: 2,
        bank_id: 1,
        to_bank_id: 2,
        amount: 1000,
        tx_type: "Debited",
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 2,
        cust_id: 2,
        to_cust_id: 1,
        acc_id: 2,
        to_acc_id: 1,
        bank_id: 2,
        to_bank_id: 1,
        amount: 1000,
        tx_type: "Credited",
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 3,
        cust_id: 4,
        to_cust_id: 3,
        acc_id: 2,
        to_acc_id: 3,
        bank_id: 4,
        to_bank_id: 1,
        amount: 1000,
        tx_type: "Debited",
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 4,
        cust_id: 3,
        to_cust_id: 4,
        acc_id: 3,
        to_acc_id: 2,
        bank_id: 1,
        to_bank_id: 4,
        amount: 1000,
        tx_type: "Credited",
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('accounts',[       
      {
        id: 1,
        acc_name: 'Roy',
        cust_name: 'Roy 1101',
        bank_id: 1,
        cust_id: 1,
        balance: 1000,
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 2,
        acc_name: 'Big Sean',
        cust_name: 'user1102',
        bank_id: 2,
        cust_id: 2,
        balance: 1000,
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 3,
        acc_name: 'user1102',
        cust_name: 'Roy 1103',
        bank_id: 1,
        cust_id: 3,
        balance: 1000,
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 4,
        acc_name: 'user1104',
        cust_name: 'Roy 1104',
        bank_id: 4,
        cust_id: 4,
        balance: 1000,
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

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('banks',[       
      {
        id: 1,
        name: 'State Bank of India',
        abbreviation: 'SBI',
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 2,
        name: 'Bank of India',
        abbreviation: 'BOI',
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 3,
        name: 'HDFC Bank',
        abbreviation: 'HDFC',
        created_at: new Date('2022-12-25'),
        updated_at: new Date('2022-12-25'),
      },
      {
        id: 4,
        name: 'HSBC Bank',
        abbreviation: 'HSBC',
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

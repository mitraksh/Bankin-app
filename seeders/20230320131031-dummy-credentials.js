'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('credentials',[       
      {
        id: '1',
        first_name: 'user1101',
        last_name: 'Roy 1101',
        email: 'useremail1101@email.com',
        password: 'user1101',
        is_admin: false,
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

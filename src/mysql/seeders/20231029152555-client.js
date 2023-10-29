'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Clients', [{
      clientId: 'fe38e892-014a-45a7-a35b-8f21ab30b874',
      companyId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
      name: 'test',
      representativeName: 'test',
      phone: '00000000000',
      postCode: '00000000',
      address: 'test',
      createdAt: '2023-08-30 17:41:54',
      updatedAt: '2023-08-30 17:41:54'
    }]);
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

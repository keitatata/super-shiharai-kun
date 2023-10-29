'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ClientBankAccounts', [{
      clientBankAccountId: 'fcdda44a-17b6-4a70-886f-d60181aba9dd',
      clientId: 'fe38e892-014a-45a7-a35b-8f21ab30b874',
      bankName: 'みずほ銀行',
      branchName: '東京支店',
      accountNumber: '1234567',
      accountName: '普通口座',
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

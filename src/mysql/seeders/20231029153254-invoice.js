'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Invoices', [{
      invoiceId: 'f9e1a133-d79a-4000-b0a9-8b7ffa11a320',
      clientId: 'fe38e892-014a-45a7-a35b-8f21ab30b874',
      companyId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
      issuedAt: '2023-08-30 17:41:54',
      commission: 440,
      commissionRate: 0.04,
      tax: 1000,
      taxRate: 1.10,
      invoiceAmount: 10440,
      paymentAmount: 10000,
      status: 'completed',
      paymentDeadline: '2023-11-30 17:41:54',
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

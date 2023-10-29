'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClientBankAccounts', {
      clientBankAccountId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      clientId: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      branchName: {
        type: Sequelize.STRING
      },
      accountNumber: {
        type: Sequelize.STRING
      },
      accountName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ClientBankAccounts');
  }
};
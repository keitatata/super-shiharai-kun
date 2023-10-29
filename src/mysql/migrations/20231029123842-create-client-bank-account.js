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
        allowNull: false,
        type: Sequelize.STRING
      },
      bankName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      branchName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountName: {
        allowNull: false,
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
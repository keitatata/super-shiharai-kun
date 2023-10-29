'use strict';
const { INVOICE_STATUS } = require('../../shared/constant');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      invoiceId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      clientId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      issuedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      commission: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      commissionRate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tax: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      taxRate: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      invoiceAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      paymentAmount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM(Object.values(INVOICE_STATUS))
      },
      paymentDeadline: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Invoices');
  }
};
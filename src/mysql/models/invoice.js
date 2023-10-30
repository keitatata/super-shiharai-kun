'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.Client, {foreignKey: 'clientId', as: 'Client'});
      Invoice.belongsTo(models.Company, {foreignKey: 'companyId', as: 'Company'});
    }
  }
  Invoice.init({
    invoiceId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    clientId: {
      // references: {
      //   model: {
      //     tableName: 'Clients',
      //     schema: 'schema'
      //   },
      //   key: 'clientId'
      // },
      type: DataTypes.UUID,
    },
    companyId: {
      type: DataTypes.UUID,
    },
    issuedAt: DataTypes.DATE,
    commission: DataTypes.INTEGER,
    commissionRate: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    taxRate: DataTypes.INTEGER,
    invoiceAmount: DataTypes.INTEGER,
    paymentAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    paymentDeadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};
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
      Invoice.belongsTo(models.Client);
      Invoice.belongsTo(models.Company);
    }
  }
  Invoice.init({
    clientId: DataTypes.STRING,
    companyId: DataTypes.STRING,
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
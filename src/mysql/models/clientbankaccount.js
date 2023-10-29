'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientBankAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ClientBankAccount.belongsTo(models.Client);
    }
  }
  ClientBankAccount.init({
    clientId: DataTypes.STRING,
    bankName: DataTypes.STRING,
    branchName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    accountName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClientBankAccount',
  });
  return ClientBankAccount;
};
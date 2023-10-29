'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Client.belongsTo(models.Company);
      Client.hasOne(models.ClientBankAccount);
      Client.hasMany(models.Invoice);
    }
  }
  Client.init({
    companyId: DataTypes.STRING,
    name: DataTypes.STRING,
    representativeName: DataTypes.STRING,
    phone: DataTypes.STRING,
    postCode: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
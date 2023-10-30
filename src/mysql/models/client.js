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
      Client.belongsTo(models.Company, {foreignKey: 'companyId', as: 'Company'});
      Client.hasOne(models.ClientBankAccount, { foreignKey: 'clientId' });
      Client.hasMany(models.Invoice, { foreignKey: 'clientId' });
    }
  }
  Client.init({
    clientId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
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
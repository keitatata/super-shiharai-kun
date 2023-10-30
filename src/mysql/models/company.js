'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.User, { foreignKey: 'companyId' });
      Company.hasMany(models.Client, { foreignKey: 'companyId' });
      Company.hasMany(models.Invoice, { foreignKey: 'companyId' });
    }
  }
  Company.init({
    companyId: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: DataTypes.STRING,
    representativeName: DataTypes.STRING,
    phone: DataTypes.STRING,
    postCode: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};
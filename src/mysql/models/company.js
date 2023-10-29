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
      Company.hasMany(models.User);
      Company.hasMany(models.Client);
      Company.hasMany(models.Invoice);
    }
  }
  Company.init({
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
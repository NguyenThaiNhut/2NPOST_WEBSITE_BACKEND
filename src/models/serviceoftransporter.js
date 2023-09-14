'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceOfTransporter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ServiceOfTransporter.init({
    idTransporter: DataTypes.STRING,
    keyService: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceOfTransporter',
  });
  return ServiceOfTransporter;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ScopeOfTransporter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ScopeOfTransporter.init({
    idTransporter: DataTypes.STRING,
    keyScope: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScopeOfTransporter',
  });
  return ScopeOfTransporter;
};
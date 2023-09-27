'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CostCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CostCode.init({
    keyService: DataTypes.STRING,
    key: DataTypes.STRING,
    kmStart: DataTypes.STRING,
    kmEnd: DataTypes.STRING,
    cost: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CostCode',
  });
  return CostCode;
};
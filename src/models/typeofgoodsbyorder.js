'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeOfGoodsByOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TypeOfGoodsByOrder.init({
    idOrder: DataTypes.STRING,
    keyTypeOfGoods: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeOfGoodsByOrder',
  });
  return TypeOfGoodsByOrder;
};
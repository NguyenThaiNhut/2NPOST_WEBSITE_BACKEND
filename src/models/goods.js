'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Goods.init({
    name: DataTypes.STRING,
    weight: DataTypes.STRING,
    value: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    idOrder: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Goods',
  });
  return Goods;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transportation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transportation.init({
    payment: DataTypes.BOOLEAN,
    idOrder: DataTypes.STRING,
    idDriver: DataTypes.STRING,
    idVehicle: DataTypes.STRING,
    keyTransportStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transportation',
  });
  return Transportation;
};
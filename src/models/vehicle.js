'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vehicle.init({
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    weight: DataTypes.STRING,
    licensePlates: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    idTransporter: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};
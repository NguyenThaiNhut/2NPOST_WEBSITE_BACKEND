'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransporterInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TransporterInfo.init({
    transporterName: DataTypes.STRING,
    foundingDate: DataTypes.STRING,
    transporterId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransporterInfo',
  });
  return TransporterInfo;
};
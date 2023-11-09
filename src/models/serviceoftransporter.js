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
      this.belongsTo(models.Transporter, {
        foreignKey: 'idTransporter',
        as: 'Transporter',
      });

      this.belongsTo(models.AllCode, {
        foreignKey: 'keyService',
        targetKey: 'key',
        as: 'AllCode',
      });

      this.hasMany(models.Cost, {
        foreignKey: 'keyService',
        sourceKey: 'keyService',
        as: 'CostByService',
      });
    }
  };
  ServiceOfTransporter.init({
    idTransporter: DataTypes.STRING,
    keyService: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ServiceOfTransporter',
  }
  );
  return ServiceOfTransporter;
};
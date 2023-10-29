'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transporter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.hasMany(models.ServiceOfTransporter, {
        foreignKey: 'idTransporter',
        as: 'ServiceOfTransporter',
      });

      this.hasOne(models.User, {
        foreignKey: 'idTransporter',
        as: 'UserTransporter',
      });
      
    }
  };
  Transporter.init({
    transporterName: DataTypes.STRING,
    foundingDate: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transporter',
  });
  return Transporter;
};
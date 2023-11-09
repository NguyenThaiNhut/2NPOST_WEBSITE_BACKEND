'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Transporter, {
        foreignKey: 'idTransporter',
        as: 'Transporter',
      });

      this.belongsTo(models.CostCode, {
        foreignKey: 'keyService',
        targetKey: 'keyService',
        as: 'keyServiceOfCostCode',
      });
      
      this.belongsTo(models.CostCode, {
        foreignKey: 'keyCost',
        targetKey: 'key',
        as: 'keyCostOfCostCode',
      });

      this.belongsTo(models.ServiceOfTransporter, {
        foreignKey: 'keyService',
        as: 'keyServiceOfServiceOfTransporter',
      });
    }
  };
  Cost.init({
    keyService: DataTypes.STRING,
    keyCost: DataTypes.STRING,
    cost: DataTypes.STRING,
    idTransporter: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cost',
  });
  return Cost;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    idCustomer: DataTypes.STRING,
    senderName: DataTypes.STRING,
    senderPhone: DataTypes.STRING,
    senderAddress: DataTypes.STRING,
    recieverName: DataTypes.STRING,
    recieverPhone: DataTypes.STRING,
    recieverAddress: DataTypes.STRING,
    typeOrder: DataTypes.INTEGER,
    idTransporter: DataTypes.STRING,
    keyService: DataTypes.STRING,
    idSenderLocation: DataTypes.STRING,
    recieverLngLocation: DataTypes.STRING,
    recieverLatLocation: DataTypes.STRING,
    keyOrderStatus: DataTypes.STRING,
    totalCost: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
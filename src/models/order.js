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
      this.belongsTo(models.User, {
        foreignKey: 'idCustomer',
        as: 'user',
      });
      
      this.belongsTo(models.AllCode, {
        foreignKey: 'keyService',
        targetKey: 'key',
        as: 'keyServiceAllCode',
      });

      this.belongsTo(models.AllCode, {
        foreignKey: 'keyOrderStatus',
        targetKey: 'key',
        as: 'keyOrderStatusAllCode',
      });

      this.belongsTo(models.UserLocation, { // định nghĩa id tọa độ người gửi
        foreignKey: 'idSenderLocation',
        as: 'senderLocation',
      });
    }
  };

  Order.init({
    idCustomer: DataTypes.STRING,
    image: DataTypes.STRING,
    senderName: DataTypes.STRING,
    senderPhone: DataTypes.STRING,
    senderAddress: DataTypes.STRING,
    recieverName: DataTypes.STRING,
    recieverPhone: DataTypes.STRING,
    recieverAddress: DataTypes.STRING,
    typeOrder: DataTypes.INTEGER, // loại "0": hệ thống tự động gợi ý nhà vận chuyển , loại "1" tự lựa chọn nhà vận chuyển
    idTransporter: DataTypes.STRING,
    keyService: DataTypes.STRING,
    idSenderLocation: DataTypes.STRING,
    recieverLngLocation: DataTypes.STRING,
    recieverLatLocation: DataTypes.STRING,
    keyOrderStatus: DataTypes.STRING,
    totalCost: DataTypes.STRING,
    note: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
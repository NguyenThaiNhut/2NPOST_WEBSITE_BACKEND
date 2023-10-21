'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        foreignKey: 'idCustomer',
        as: 'Order',
      });
    }
  };
  User.init({
    userName: DataTypes.STRING,
    birthday: DataTypes.STRING,
    keyGender: DataTypes.STRING,
    address: DataTypes.STRING,
    idDefaultLocation: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    keyRole: DataTypes.STRING,
    idTransporter: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
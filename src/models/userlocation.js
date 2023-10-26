'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order, {
        foreignKey: 'idSenderLocation',
        as: 'Order',
      });
    }
  };
  UserLocation.init({
    lng: DataTypes.STRING,
    lat: DataTypes.STRING,
    idUser: DataTypes.STRING,
    detailAddress: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserLocation',
  });
  return UserLocation;
};
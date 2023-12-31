'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transportation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      payment: {
        type: Sequelize.BOOLEAN
      },
      typePayment: {
        type: Sequelize.INTEGER
      },
      idOrder: {
        type: Sequelize.STRING
      },
      idDriver: {
        type: Sequelize.STRING
      },
      idVehicle: {
        type: Sequelize.STRING
      },
      keyTransportStatus: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transportation');
  }
};
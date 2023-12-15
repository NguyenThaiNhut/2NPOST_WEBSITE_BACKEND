'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCustomer: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      senderName: {
        type: Sequelize.STRING
      },
      senderPhone: {
        type: Sequelize.STRING
      },
      senderAddress: {
        type: Sequelize.STRING
      },
      recieverName: {
        type: Sequelize.STRING
      },
      recieverPhone: {
        type: Sequelize.STRING
      },
      recieverAddress: {
        type: Sequelize.STRING
      },
      typeOrder: {
        type: Sequelize.INTEGER
      },
      idTransporter: {
        type: Sequelize.STRING
      },
      keyService: {
        type: Sequelize.STRING
      },
      idSenderLocation: {
        type: Sequelize.STRING
      },
      recieverLngLocation: {
        type: Sequelize.STRING
      },
      recieverLatLocation: {
        type: Sequelize.STRING
      },
      keyOrderStatus: {
        type: Sequelize.STRING
      },
      totalCost: {
        type: Sequelize.STRING
      },
      note: {
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
    await queryInterface.dropTable('Orders');
  }
};
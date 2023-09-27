'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CostCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keyService: {
        type: Sequelize.STRING
      },
      key: {
        type: Sequelize.STRING
      },
      kmStart: {
        type: Sequelize.STRING
      },
      kmEnd: {
        type: Sequelize.STRING
      },
      cost: {
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
    await queryInterface.dropTable('CostCodes');
  }
};
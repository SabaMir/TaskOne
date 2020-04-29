'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mobiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mobileName: {
        type: Sequelize.STRING
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mobileModel: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.FLOAT
      },
      billNo: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('mobiles');
  }
};
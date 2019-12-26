"use strict";
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
      },
      firstName: { type: sequelize.STRING },
      lastName: { type: sequelize.STRING },
      username: { type: sequelize.STRING },
      email: { type: sequelize.STRING },
      password: { type: sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE
      }
    });
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.dropTable("Users");
  }
};

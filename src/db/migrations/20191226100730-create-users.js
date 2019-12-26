"use strict";
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      username: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.dropTable("Users");
  }
};

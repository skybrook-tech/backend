"use strict";
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.createTable("Migrations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
      },
      projectId: {
        type: sequelize.INTEGER,
        references: { model: "Projects", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      type: { type: sequelize.STRING, allowNull: false },
      timeStamp: { type: sequelize.STRING, allowNull: false },
      isMigrated: { type: sequelize.BOOLEAN, allowNull: false },
      up: { type: sequelize.JSON, allowNull: false },
      down: { type: sequelize.JSON, allowNull: false },
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
    return queryInterface.dropTable("Migrations");
  }
};

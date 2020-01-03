"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { MigrationsModelStatic } from "./types";

module.exports = (sequelize: Sequelize) => {
  const Migrations = sequelize.define(
    "Migrations",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      projectId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      timeStamp: { type: DataTypes.STRING, allowNull: false },
      isMigrated: { type: DataTypes.BOOLEAN, allowNull: false },
      up: { type: DataTypes.JSON, allowNull: false },
      down: { type: DataTypes.JSON, allowNull: false },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  ) as MigrationsModelStatic & { associate: (models: Model) => void };

  Migrations.associate = models => {
    // associations go here
  };

  return Migrations;
};

"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ModelsModelStatic } from "./types";

module.exports = (sequelize: Sequelize) => {
  const Models = sequelize.define(
    "Models",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      projectId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      relations: { type: DataTypes.JSON, defaultValue: [] },
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
  ) as ModelsModelStatic & { associate: (models: Model) => void };

  Models.associate = models => {
    // associations go here
  };

  return Models;
};

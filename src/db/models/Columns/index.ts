"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ColumnsModelStatic } from "./types";

module.exports = (sequelize: Sequelize) => {
  const Columns = sequelize.define(
    "Columns",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      modelId: { type: DataTypes.INTEGER, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      options: { type: DataTypes.JSON, allowNull: false, defaultValue: {} },
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
  ) as ColumnsModelStatic & { associate: (models: Model) => void };

  Columns.associate = models => {
    // associations go here
  };

  return Columns;
};

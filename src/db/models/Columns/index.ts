"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ColumnsModelStatic } from "./types";
import { Db } from "../db.types";

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
  ) as ColumnsModelStatic & { associate: (db: Db) => void };

  Columns.associate = db => {
    Columns.belongsTo(db.Models, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "modelId" },
      onDelete: "CASCADE",
      hooks: true
    });
  };

  return Columns;
};

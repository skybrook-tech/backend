"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ModelsModelStatic } from "./types";
import { Db } from "../db.types";

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
  ) as ModelsModelStatic & {
    associate: (db: Db) => void;
    getIncluded: (db: Db) => void;
  };

  Models.associate = db => {
    Models.belongsTo(db.Projects, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "projectId" },
      onDelete: "CASCADE",
      hooks: true
    });

    Models.hasMany(db.Columns, {
      foreignKey: { allowNull: false, name: "modelId" },
      onDelete: "CASCADE",
      hooks: true,
      as: "columns"
    });
  };

  Models.getIncluded = db => {
    return [{ model: db.Columns, as: "columns", attributes: ["id"] }];
  };

  return Models;
};

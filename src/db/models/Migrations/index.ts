"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { MigrationsModelStatic } from "./types";
import { Db } from "../db.types";

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
  ) as MigrationsModelStatic & { associate: (db: Db) => void };

  Migrations.associate = db => {
    Migrations.belongsTo(db.Projects, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "projectId" },
      onDelete: "CASCADE",
      hooks: true
    });
  };

  return Migrations;
};

"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ProjectsModelStatic } from "./types";
import { Db } from "../db.types";

module.exports = (sequelize: Sequelize) => {
  const Projects = sequelize.define(
    "Projects",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: { type: DataTypes.STRING, allowNull: false },
      urlAffix: { type: DataTypes.STRING, defaultValue: "" },
      userId: { type: DataTypes.STRING, allowNull: false },
      uuid: { type: DataTypes.STRING, allowNull: false },
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
  ) as ProjectsModelStatic & { associate: (db: Db) => void };

  Projects.associate = db => {
    Projects.belongsTo(db.Users, {
      targetKey: "id",
      foreignKey: { allowNull: false, name: "userId" },
      onDelete: "CASCADE",
      hooks: true
    });

    Projects.hasMany(db.Models, {
      foreignKey: { allowNull: false, name: "projectId" },
      onDelete: "CASCADE",
      hooks: true,
      as: "models"
    });

    Projects.hasMany(db.Migrations, {
      foreignKey: { allowNull: false, name: "projectId" },
      onDelete: "CASCADE",
      hooks: true,
      as: "migrations"
    });
  };

  return Projects;
};

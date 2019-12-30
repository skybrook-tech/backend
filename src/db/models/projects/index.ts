"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { ProjectsModelStatic } from "./types";

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
      urlAffix: { type: DataTypes.STRING },
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
  ) as ProjectsModelStatic & { associate: (models: Model) => void };

  Projects.associate = models => {
    // associations go here
  };

  return Projects;
};

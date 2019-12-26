"use strict";
import { DataTypes, Model, Sequelize } from "sequelize";
import { UsersModelStatic } from "./types";

module.exports = (sequelize: Sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
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
    },
    {}
  ) as UsersModelStatic & { associate: (models: Model) => void };

  Users.associate = (models) => {
    // associations go here
  };

  return Users;
};

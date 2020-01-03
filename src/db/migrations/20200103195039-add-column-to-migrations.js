"use strict";
module.exports = {
  up: async (queryInterface, sequelize) => {
    // up migration goes here
    return queryInterface.addColumn("Migrations", "name", sequelize.STRING, { allowNull: false });
  },
  down: async queryInterface => {
    // down migration goes here
    return queryInterface.removeColumn("Migrations", "name");
  }
};

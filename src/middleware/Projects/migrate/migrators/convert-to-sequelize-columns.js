// TODO: vonvert to typescript
const convertToSequelizeColumns = (columns, Sequelize) => {
  const sequelizeColumns = {};

  columns.forEach(({ type, name, options }) => {
    sequelizeColumns[name] = { type: Sequelize.DataTypes[type], ...options };
  });

  return sequelizeColumns;
};

module.exports = convertToSequelizeColumns;

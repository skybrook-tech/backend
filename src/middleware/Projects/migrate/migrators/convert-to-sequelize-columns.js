// TODO: vonvert to typescript
const convertToSequelizeColumns = (columns, Sequelize) => {
  const sequelizeColumns = {};

  columns.forEach(({ type, name, line_number, ...rest }) => {
    sequelizeColumns[name] = { ...rest, type: Sequelize.DataTypes[type] };
  });

  return sequelizeColumns;
};

module.exports = convertToSequelizeColumns;

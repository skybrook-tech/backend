import db from "../../../../db/models";
import { MigrationsModel } from "../../../../db/models/Migrations/types";

const addColumn = {
  up: (migration: MigrationsModel) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { action: type, tableName, column, schema } = migration.up;

        const tableNameAndSchema = { tableName, schema };

        const { name, options } = column;
        const attribute = { ...options, type: db.Sequelize.DataTypes[column.type] };

        // @ts-ignore
        await db.sequelize.queryInterface[type](tableNameAndSchema, name, attribute);

        await migration.update({ isMigrated: true, ...migration });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export default addColumn;

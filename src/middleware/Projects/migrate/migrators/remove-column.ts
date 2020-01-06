import db from "../../../../db/models";
import { MigrationsModel } from "../../../../db/models/Migrations/types";

const renameColumn = {
  up: (migration: MigrationsModel) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { action: type, tableName, column, schema } = migration.up;

        const tableNameAndSchema = { tableName, schema };

        // @ts-ignore
        await db.sequelize.queryInterface[type](tableNameAndSchema, column.name);

        await migration.update({ isMigrated: true, ...migration });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export default renameColumn;

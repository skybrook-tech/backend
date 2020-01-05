import db from "../../../../db/models";
import { MigrationsModel } from "../../../../db/models/Migrations/types";

const dropTable = {
  up: (migration: MigrationsModel) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { action: type, tableName, schema } = migration.up;

        const tableNameAndSchema = { tableName, schema };

        // @ts-ignore
        await db.sequelize.queryInterface[type](tableNameAndSchema);
        await migration.update({ isMigrated: true, ...migration });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export default dropTable;

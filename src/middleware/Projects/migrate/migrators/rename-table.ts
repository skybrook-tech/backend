import db from "../../../../db/models";
import { MigrationsModel } from "../../../../db/models/Migrations/types";

const renameTable = {
  up: (migration: MigrationsModel) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { action: type, from, to, schema } = migration.up;

        const before = { tableName: from.name, schema };
        // NOTE: the after clause doesn't need to have the schema appended to the front.
        const after = { tableName: to.name };

        // @ts-ignore
        await db.sequelize.queryInterface[type](before, after);

        await migration.update({ isMigrated: true, ...migration });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export default renameTable;

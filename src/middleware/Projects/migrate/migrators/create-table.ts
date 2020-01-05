import convertToSequelizeColumns from "./convert-to-sequelize-columns";
import db from "../../../../db/models";
import { MigrationsModel } from "../../../../db/models/Migrations/types";

const createTable = {
  up: (migration: MigrationsModel) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { action: type, tableName, columns, schema } = migration.up;
        const sqlColumns = convertToSequelizeColumns(columns, db.Sequelize);

        const options = { schema, freezeTableName: true };

        // @ts-ignore
        await db.sequelize.queryInterface[type](tableName, sqlColumns, options);
        await migration.update({ isMigrated: true, ...migration });

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export default createTable;

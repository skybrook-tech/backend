import db from "../../../../db/models";
import { MigrationsModel } from "../../../../db/models/Migrations/types";

interface TypesSwitchArgs {
  fromType: string;
  toType: string;
  name: string;
}

const checkIfNeedsCasting = ({ fromType, toType, name }: TypesSwitchArgs) => {
  const combinedStr = `${fromType}_${toType}`;
  switch (combinedStr) {
    case "STRING_INTEGER":
      return `INTEGER USING CAST("${name}" as INTEGER)`;

    default:
      return db.Sequelize.DataTypes[toType];
  }
};

const changeColumn = {
  up: (migration: MigrationsModel) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { action: type, tableName, from, to, schema } = migration.up;

        const tableNameAndSchema = { tableName, schema };

        const { type: fromType } = from;
        const { name, type: toType, ...attr } = to;

        const attribute = { ...attr, type: checkIfNeedsCasting({ fromType, toType, name }) };

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

export default changeColumn;

import db from "../../../db/models";
import { Request, Response } from "express";
import getChangedColsAndMigrations from "./get-changed-cols-and-migrations";

const handleColumns = async (req: Request, res: Response) => {
  const { newAndUpdatedColumns, deletedColumns, migrations } = await getChangedColsAndMigrations(
    req,
    res
  );

  if (migrations.length) {
    await db.Migrations.bulkCreate(migrations);
  }

  if (newAndUpdatedColumns.length) {
    await db.Columns.bulkCreate(newAndUpdatedColumns, {
      updateOnDuplicate: ["modelId", "name", "type", "options"]
    });
  }

  if (deletedColumns.length) {
    await db.Columns.destroy({ where: { id: deletedColumns.map(col => col.id) } });
  }
};

export default handleColumns;

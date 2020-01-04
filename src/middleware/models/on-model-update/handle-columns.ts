import db from "../../../db/models";
import { Request, Response, NextFunction } from "express";

const handleColumns = async (req: Request) => {
  const nextColumns = [...req.body.columns].map(col => ({ ...col, modelId: req.params.id }));
  const prevColumns = await db.Columns.findAll({ where: { modelId: req.params.id } });

  const newColumns = nextColumns.filter(col => !col.id);
  const updatedColumns = nextColumns.filter(col => !col._delete);
  const deletedColumns = nextColumns.filter(col => col._delete);

  await db.Columns.bulkCreate([...newColumns, ...updatedColumns], {
    updateOnDuplicate: ["modelId", "name", "type", "options"]
  });
  await db.Columns.destroy({ where: { id: deletedColumns.map(col => col.id) } });
};

export default handleColumns;

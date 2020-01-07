import { Request, Response, NextFunction } from "express";
import db from "../../../db/models";
import migrationTemplates from "../migration-templates";

const generateDropTableMigration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = res.locals.context.currentProject;
    const modelId = req.params.id;

    const model = await db.Models.findOne(
      // @ts-ignore
      { where: { id: modelId }, include: db.Models.getIncluded(db) }
    );

    await db.Migrations.create(migrationTemplates.dropTable({ project, model }));

    next();
  } catch (error) {
    next(error);
  }
};

export default generateDropTableMigration;

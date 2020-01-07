import db from "../../../db/models";
import { Request, Response, NextFunction } from "express";
import migrationTemplates from "../migration-templates";

const handleTableName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = res.locals.context.currentProject;
    const modelId = parseInt(req.params.id, 10);
    const model = await db.Models.findOne({ where: { id: modelId } });

    if (req.body.name && model.name !== req.body.name) {
      const prevValue = model.dataValues;
      const nextValue = { ...prevValue, ...req.body };

      await db.Migrations.create(migrationTemplates.renameTable({ project, prevValue, nextValue }));
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default handleTableName;

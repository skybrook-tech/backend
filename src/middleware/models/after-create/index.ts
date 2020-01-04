import { Request, Response, NextFunction } from "express";
import db from "../../../db/models";
import migrationTemplates from "../migration-templates";

const afterModelCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = res.locals.context.currentProject;
    const model = res.locals.response.data;

    await db.Migrations.create(migrationTemplates.createTable({ project, model }));

    next();
  } catch (error) {
    next(error);
  }
};

export default afterModelCreate;

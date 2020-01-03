import { Request, Response, NextFunction } from "express";
import db from "../../db/models";
import migrationTypes from "../../constants/migration-types";

const generateCreateTableMigration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = res.locals.context.pathIds.projectId;
    const newModel = res.locals.response.data;

    const project = await db.Projects.findOne({ where: { id: projectId } });

    const migrationName = `${Date.now()}-${migrationTypes.CREATE_TABLE}-${newModel.name}`;

    await db.Migrations.create({
      projectId,
      name: migrationName,
      type: migrationTypes.CREATE_TABLE,
      timeStamp: Date.now(),
      isMigrated: false,
      up: {
        action: migrationTypes.CREATE_TABLE,
        table_name: newModel.name,
        schema: project.uuid,
        columns: newModel.columns || []
      },
      down: {
        action: migrationTypes.DROP_TABLE,
        table_name: newModel.name,
        schema: project.uuid
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default generateCreateTableMigration;

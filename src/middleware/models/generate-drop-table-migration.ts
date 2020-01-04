import { Request, Response, NextFunction } from "express";
import db from "../../db/models";
import migrationTypes from "../../constants/migration-types";

const generateDropTableMigration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = res.locals.context.pathIds.projectId;
    const modelId = req.params.id;

    const project = await db.Projects.findOne({ where: { id: projectId } });
    const model = await db.Models.findOne(
      // @ts-ignore
      { where: { id: modelId }, include: db.Models.getIncluded(db) }
    );

    const timeStamp = Date.now();
    const migrationName = `${timeStamp}-${migrationTypes.DROP_TABLE}-${model.name}`;

    await db.Migrations.create({
      projectId,
      name: migrationName,
      type: migrationTypes.DROP_TABLE,
      timeStamp,
      isMigrated: false,
      up: {
        action: migrationTypes.DROP_TABLE,
        tableName: model.name,
        schema: project.uuid
      },
      down: {
        action: migrationTypes.CREATE_TABLE,
        tableName: model.name,
        schema: project.uuid,
        columns: model.columns || []
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default generateDropTableMigration;

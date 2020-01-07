import arraySort from "array-sort";
import migrationFunctions from "./migrators";
import db from "../../../db/models";
import get from "lodash/get";
import { Request, Response, NextFunction } from "express";

const runMigrations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = res.locals.context.currentProject.id;
    const migrations = await db.Migrations.findAll({ where: { projectId } });

    const migrationsNotApplied = arraySort(migrations, "timeStamp").filter(
      ({ isMigrated }) => !isMigrated
    );

    for (const migration of migrationsNotApplied) {
      await get(migrationFunctions, migration.type).up(migration);
    }

    res.locals.response.data = await db.Migrations.findAll({ where: { projectId } });

    next();
  } catch (error) {
    next(error);
  }
};

export default runMigrations;

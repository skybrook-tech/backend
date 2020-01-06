import arraySort from "array-sort";
import migrationFunctions from "./migrators";
import db from "../../../db/models";
import get from "lodash/get";
import { Response } from "express";

const runMigrations = (res: Response) =>
  new Promise(async (resolve, reject) => {
    try {
      const projectId = res.locals.context.currentProject.id;
      const migrations = await db.Migrations.findAll({ where: { projectId } });

      const migrationsNotApplied = arraySort(migrations, "timeStamp").filter(
        ({ isMigrated }) => !isMigrated
      );

      for (const migration of migrationsNotApplied) {
        await get(migrationFunctions, migration.type).up(migration);
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });

export default runMigrations;

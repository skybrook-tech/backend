import db from "../../../db/models";
import { Request, Response } from "express";
import isEqual from "fast-deep-equal";
import get from "lodash/get";
import { MigrationArgs, Column } from "../types";
import migrationTemplates from "../migration-templates";
import migrationTypes from "../../../constants/migration-types";

const createMigrationSwitch = (migrationArgs: MigrationArgs) => {
  const { prevValue, nextValue } = migrationArgs;

  if (!prevValue) {
    return [migrationTemplates.addColumn(migrationArgs)];
  }

  const { name: prevName, ...prevRest } = prevValue;
  const { name: nextName, _delete, ...nextRest } = nextValue;

  const migrations = [];

  if (_delete) {
    return [migrationTemplates.removeColumn(migrationArgs)];
  }

  if (prevName !== nextName) {
    migrations.push(migrationTemplates.renameColumn(migrationArgs));
  }

  if (!isEqual(nextRest, prevRest)) {
    migrations.push(migrationTemplates.changeColumn(migrationArgs));
  }

  return migrations;
};

// TODO: rewrite tests and think of better name

const getChangedColsAndMigrations = async (req: Request, res: Response) => {
  const project = res.locals.context.currentProject;
  const modelId = parseInt(req.params.id, 10);
  const prevModel = await db.Models.findOne({ where: { id: modelId } });
  const model = { ...prevModel.dataValues, name: req.body.name || prevModel.name };

  const incomingColumns = req.body.columns.concat() as Column[];

  const existingColIds = incomingColumns.map(col => col.id);

  const prevColumns = await db.Columns.findAll({ where: { id: existingColIds } });

  const newAndUpdatedColumns: any[] = [];
  const deletedColumns: any[] = [];
  let migrations: any[] = [];

  incomingColumns.forEach((col: Column) => {
    const matchingColumn = prevColumns.find(prevCol => prevCol.id === col.id);

    const prevValue = get(matchingColumn, "dataValues", null);
    const nextValue = { ...prevValue, ...col, modelId };

    const columnMigrations = createMigrationSwitch({ prevValue, nextValue, project, model });

    if (columnMigrations.length) {
      migrations = [...migrations, ...columnMigrations];

      if (columnMigrations[0].type === migrationTypes.REMOVE_COLUMN) {
        deletedColumns.push(nextValue);
      } else {
        newAndUpdatedColumns.push(nextValue);
      }
    }
  });

  return { newAndUpdatedColumns, deletedColumns, migrations };
};

export { createMigrationSwitch };
export default getChangedColsAndMigrations;

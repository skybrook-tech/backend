import db from "../../../db/models";
import { Request, Response } from "express";
import isEqual from "fast-deep-equal";
import get from "lodash/get";
import { MigrationArgs, Column } from "../types";
import migrationTemplates from "../migration-templates";

const createMigrationSwitch = (migrationArgs: MigrationArgs) => {
  const { prevValue, nextValue } = migrationArgs;

  if (!prevValue) {
    return migrationTemplates.addColumn(migrationArgs);
  }

  const { name: prevName, ...prevRest } = prevValue;
  const { name: nextName, _delete, ...nextRest } = nextValue;

  if (prevName !== nextName) {
    return migrationTemplates.renameColumn(migrationArgs);
  }

  if (_delete) {
    return migrationTemplates.removeColumn(migrationArgs);
  }

  if (!isEqual(nextRest, prevRest)) {
    return migrationTemplates.changeColumn(migrationArgs);
  }
};

const getColumnComparisons = async (req: Request, res: Response) => {
  const project = res.locals.context.currentProject;
  const modelId = parseInt(req.params.id, 10);
  const model = await db.Models.findOne({ where: { id: modelId } });

  const incomingColumns = req.body.columns.concat() as Column[];

  const existingColIds = incomingColumns.map(col => col.id);

  const prevColumns = await db.Columns.findAll({ where: { id: existingColIds } });

  return incomingColumns.map((col: Column) => {
    const matchingColumn = prevColumns.find(prevCol => prevCol.id === col.id);

    const prevValue = get(matchingColumn, "dataValues", null);
    const nextValue = { ...prevValue, ...col, modelId };

    const migration = createMigrationSwitch({ prevValue, nextValue, project, model });

    return { prevValue, nextValue, migration };
  });
};

export { createMigrationSwitch };
export default getColumnComparisons;

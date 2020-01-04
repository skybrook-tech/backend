import migrationTypes from "../../../constants/migration-types";
import { MigrationArgs } from "../types";

const addColumnTemplate = ({ nextValue, project, model }: MigrationArgs) => {
  const timeStamp = Date.now();
  const migrationName = `${timeStamp}-${migrationTypes.ADD_COLUMN}-${nextValue.name}`;

  return {
    projectId: project.id,
    type: migrationTypes.ADD_COLUMN,
    name: migrationName,
    timeStamp,
    isMigrated: false,
    up: {
      action: migrationTypes.ADD_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      column: nextValue
    },
    down: {
      action: migrationTypes.REMOVE_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      column: nextValue
    }
  };
};

export default addColumnTemplate;

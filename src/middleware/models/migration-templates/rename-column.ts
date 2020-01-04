import migrationTypes from "../../../constants/migration-types";
import { MigrationArgs } from "../types";

const renameColumnTemplate = ({ prevValue, nextValue, project, model }: MigrationArgs) => {
  const timeStamp = Date.now();
  const migrationName = `${timeStamp}-${migrationTypes.RENAME_COLUMN}-${nextValue.name}`;

  return {
    projectId: project.id,
    type: migrationTypes.RENAME_COLUMN,
    name: migrationName,
    timeStamp,
    isMigrated: false,
    up: {
      action: migrationTypes.RENAME_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      from: prevValue.name,
      to: nextValue.name
    },
    down: {
      action: migrationTypes.RENAME_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      from: nextValue.name,
      to: prevValue.name
    }
  };
};

export default renameColumnTemplate;

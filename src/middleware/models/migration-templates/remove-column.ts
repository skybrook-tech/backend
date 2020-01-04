import migrationTypes from "../../../constants/migration-types";
import { MigrationArgs } from "../types";

const removeColumnTemplate = ({ prevValue, nextValue, project, model }: MigrationArgs) => {
  const timeStamp = Date.now();
  const migrationName = `${timeStamp}-${migrationTypes.REMOVE_COLUMN}-${nextValue.name}`;

  return {
    projectId: project.id,
    type: migrationTypes.REMOVE_COLUMN,
    name: migrationName,
    timeStamp,
    isMigrated: false,
    up: {
      action: migrationTypes.REMOVE_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      column: nextValue
    },
    down: {
      action: migrationTypes.ADD_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      column: prevValue
    }
  };
};

export default removeColumnTemplate;

import migrationTypes from "../../../constants/migration-types";
import { MigrationArgs } from "../types";

const changeColumnTemplate = ({ prevValue, nextValue, project, model }: MigrationArgs) => {
  const timeStamp = Date.now();
  const migrationName = `${timeStamp}-${migrationTypes.CHANGE_COLUMN}-${nextValue.name}`;

  return {
    projectId: project.id,
    type: migrationTypes.CHANGE_COLUMN,
    name: migrationName,
    timeStamp,
    isMigrated: false,
    up: {
      action: migrationTypes.CHANGE_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      column: nextValue
    },
    down: {
      action: migrationTypes.CHANGE_COLUMN,
      tableName: model.name,
      schema: project.uuid,
      column: prevValue
    }
  };
};

export default changeColumnTemplate;

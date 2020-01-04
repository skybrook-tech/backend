import migrationTypes from "../../../constants/migration-types";
import { MigrationArgs } from "../before-update/types";

const createTable = ({ project, model }: MigrationArgs) => {
  const timeStamp = Date.now();
  const migrationName = `${timeStamp}-${migrationTypes.CREATE_TABLE}-${model.name}`;

  return {
    projectId: project.id,
    name: migrationName,
    type: migrationTypes.CREATE_TABLE,
    timeStamp,
    isMigrated: false,
    up: {
      action: migrationTypes.CREATE_TABLE,
      tableName: model.name,
      schema: project.uuid,
      columns: model.columns || []
    },
    down: {
      action: migrationTypes.DROP_TABLE,
      tableName: model.name,
      schema: project.uuid
    }
  };
};

export default createTable;

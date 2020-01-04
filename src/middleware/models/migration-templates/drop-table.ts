import migrationTypes from "../../../constants/migration-types";
import { MigrationArgs } from "../types";

const dropTable = ({ project, model }: MigrationArgs) => {
  const timeStamp = Date.now();
  const migrationName = `${timeStamp}-${migrationTypes.DROP_TABLE}-${model.name}`;

  return {
    projectId: project.id,
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
  };
};

export default dropTable;

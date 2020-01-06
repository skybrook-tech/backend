import migrationTypes from "../../../constants/migration-types";
import { MigrationArgs } from "../types";

const renameTable = ({ project, prevValue, nextValue }: MigrationArgs) => {
  const timeStamp = Date.now();
  const migrationName = `${timeStamp}-${migrationTypes.RENAME_TABLE}`;

  return {
    projectId: project.id,
    name: migrationName,
    type: migrationTypes.RENAME_TABLE,
    timeStamp,
    isMigrated: false,
    up: {
      action: migrationTypes.RENAME_TABLE,
      from: prevValue,
      to: nextValue,
      schema: project.uuid
    },
    down: {
      action: migrationTypes.RENAME_TABLE,
      from: nextValue,
      to: prevValue,
      schema: project.uuid
    }
  };
};

export default renameTable;

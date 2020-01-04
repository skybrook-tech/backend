import generateCreateTableMigration from "./generate-create-table-migration";
import generateDropTableMigration from "./generate-drop-table-migration";

interface ModelsMiddleware {
  generateCreateTableMigration: any;
  generateDropTableMigration: any;
}

const modelsMiddleware = {
  generateCreateTableMigration,
  generateDropTableMigration
} as ModelsMiddleware;

export default modelsMiddleware;

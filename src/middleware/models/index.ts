import generateCreateTableMigration from "./generate-create-table-migration";
import generateDropTableMigration from "./generate-drop-table-migration";
import onModelUpdate from "./on-model-update";

interface ModelsMiddleware {
  generateCreateTableMigration: any;
  generateDropTableMigration: any;
  onModelUpdate: any;
}

const modelsMiddleware = {
  generateCreateTableMigration,
  generateDropTableMigration,
  onModelUpdate
} as ModelsMiddleware;

export default modelsMiddleware;

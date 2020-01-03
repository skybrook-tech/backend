import generateCreateTableMigration from "./generate-create-table-migration";

interface ModelsMiddleware {
  generateCreateTableMigration: any;
}

const modelsMiddleware = {
  generateCreateTableMigration
} as ModelsMiddleware;

export default modelsMiddleware;

import addColumn from "./add-column";
import changeColumn from "./change-column";
import createTable from "./create-table";
import dropTable from "./drop-table";
import renameTable from "./rename-table";
import removeColumn from "./remove-column";
import renameColumn from "./rename-column";
import { MigrationArgs } from "../types";

export interface MigrationTemplate {
  projectId: number;
  type: string;
  name: string;
  timeStamp: number;
  isMigrated: boolean;
  up: any;
  down: any;
}

type MigrationTemplateFunction = (args: MigrationArgs) => MigrationTemplate;

interface MigrationTemplates {
  addColumn: MigrationTemplateFunction;
  changeColumn: MigrationTemplateFunction;
  createTable: MigrationTemplateFunction;
  dropTable: MigrationTemplateFunction;
  renameTable: MigrationTemplateFunction;
  removeColumn: MigrationTemplateFunction;
  renameColumn: MigrationTemplateFunction;
}

const migrationTemplates = {
  addColumn,
  changeColumn,
  createTable,
  dropTable,
  renameTable,
  removeColumn,
  renameColumn
} as MigrationTemplates;

export default migrationTemplates;

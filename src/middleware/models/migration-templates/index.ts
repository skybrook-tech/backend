import addColumn from "./add-column";
import changeColumn from "./change-column";
import createTable from "./create-table";
import dropTable from "./drop-table";
import removeColumn from "./remove-column";
import renameColumn from "./rename-column";

const migrationTemplates = {
  addColumn,
  changeColumn,
  createTable,
  dropTable,
  removeColumn,
  renameColumn
};

export default migrationTemplates;

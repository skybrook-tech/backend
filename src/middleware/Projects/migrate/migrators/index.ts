import dropTable from "./drop-table";
import createTable from "./create-table";
import renameTable from "./rename-table";
import removeColumn from "./remove-column";
import addColumn from "./add-column";
import renameColumn from "./rename-column";
import changeColumn from "./change-column";

const migrators = {
  dropTable,
  createTable,
  renameTable,
  removeColumn,
  addColumn,
  renameColumn,
  changeColumn
};

export default migrators;

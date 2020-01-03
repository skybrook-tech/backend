const migrationTypes = {
  CREATE_TABLE: "createTable",
  DROP_TABLE: "dropTable",
  RENAME_TABLE: "renameTable",
  ADD_COLUMN: "addColumn",
  REMOVE_COLUMN: "removeColumn",
  RENAME_COLUMN: "renameColumn",
  CHANGE_COLUMN: "changeColumn"
};

module.exports = migrationTypes;

import dropTable from "../../../models/migration-templates/drop-table";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/migration-templates/renameColumn", () => {
  const project = { id: 24, uuid: "some-uuid" };
  const model = {
    id: 200,
    name: "mockModel",
    columns: [
      { name: "col1", type: "STRING", options: {} },
      { name: "col2", type: "STRING", options: {} }
    ]
  };

  it("returns renameColumn migration", () => {
    const dropTableMigration = dropTable({ project, model });

    expect(dropTableMigration.type).toBe(migrationTypes.DROP_TABLE);
    expect(dropTableMigration.isMigrated).toBe(false);
    expect(dropTableMigration.projectId).toBe(project.id);

    expect(dropTableMigration.up.action).toBe(migrationTypes.DROP_TABLE);
    expect(dropTableMigration.up.tableName).toBe(model.name);
    expect(dropTableMigration.up.schema).toBe(project.uuid);

    expect(dropTableMigration.down.action).toBe(migrationTypes.CREATE_TABLE);
    expect(dropTableMigration.down.tableName).toBe(model.name);
    expect(dropTableMigration.down.schema).toBe(project.uuid);
    expect(dropTableMigration.down.columns).toBe(model.columns);
  });
});

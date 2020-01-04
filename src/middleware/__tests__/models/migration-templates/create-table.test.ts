import createTable from "../../../models/migration-templates/create-table";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/migration-templates/createTable", () => {
  const project = { id: 24, uuid: "some-uuid" };
  const model = {
    id: 200,
    name: "mockModel",
    columns: [
      { name: "col1", type: "STRING", options: {} },
      { name: "col2", type: "STRING", options: {} }
    ]
  };

  it("returns createTable migration", () => {
    const createTableMigration = createTable({ project, model });

    expect(createTableMigration.type).toBe(migrationTypes.CREATE_TABLE);
    expect(createTableMigration.isMigrated).toBe(false);
    expect(createTableMigration.projectId).toBe(project.id);

    expect(createTableMigration.up.action).toBe(migrationTypes.CREATE_TABLE);
    expect(createTableMigration.up.tableName).toBe(model.name);
    expect(createTableMigration.up.schema).toBe(project.uuid);
    expect(createTableMigration.up.columns).toBe(model.columns);

    expect(createTableMigration.down.action).toBe(migrationTypes.DROP_TABLE);
    expect(createTableMigration.down.tableName).toBe(model.name);
    expect(createTableMigration.down.schema).toBe(project.uuid);
  });
});

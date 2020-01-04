import addColumn from "../../../models/migration-templates/add-column";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/migration-templates/addColumn", () => {
  const project = { id: 24, uuid: "some-uuid" };
  const model = { id: 200, name: "mockModel" };
  const nextValue = { name: "mockColumn", type: "STRING", options: {} };

  it("returns addColumn migration", async () => {
    const addColumnMigration = addColumn({ project, model, nextValue });

    expect(addColumnMigration.type).toBe(migrationTypes.ADD_COLUMN);
    expect(addColumnMigration.isMigrated).toBe(false);
    expect(addColumnMigration.projectId).toBe(project.id);

    expect(addColumnMigration.up.action).toBe(migrationTypes.ADD_COLUMN);
    expect(addColumnMigration.up.tableName).toBe(model.name);
    expect(addColumnMigration.up.schema).toBe(project.uuid);
    expect(addColumnMigration.up.column).toBe(nextValue);

    expect(addColumnMigration.down.action).toBe(migrationTypes.REMOVE_COLUMN);
    expect(addColumnMigration.down.tableName).toBe(model.name);
    expect(addColumnMigration.down.schema).toBe(project.uuid);
    expect(addColumnMigration.down.column).toBe(nextValue);
  });
});

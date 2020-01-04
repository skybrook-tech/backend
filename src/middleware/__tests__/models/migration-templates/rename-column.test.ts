import addColumn from "../../../models/migration-templates/rename-column";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/migration-templates/renameColumn", () => {
  const project = { id: 24, uuid: "some-uuid" };
  const model = { id: 200, name: "mockModel" };
  const prevValue = { name: "oldName", type: "STRING", options: {} };
  const nextValue = { name: "newName", type: "STRING", options: {} };

  it("returns renameColumn migration", () => {
    const addColumnMigration = addColumn({ project, model, nextValue, prevValue });

    expect(addColumnMigration.type).toBe(migrationTypes.RENAME_COLUMN);
    expect(addColumnMigration.isMigrated).toBe(false);
    expect(addColumnMigration.projectId).toBe(project.id);

    expect(addColumnMigration.up.action).toBe(migrationTypes.RENAME_COLUMN);
    expect(addColumnMigration.up.tableName).toBe(model.name);
    expect(addColumnMigration.up.schema).toBe(project.uuid);
    expect(addColumnMigration.up.from).toBe(prevValue.name);
    expect(addColumnMigration.up.to).toBe(nextValue.name);

    expect(addColumnMigration.down.action).toBe(migrationTypes.RENAME_COLUMN);
    expect(addColumnMigration.down.tableName).toBe(model.name);
    expect(addColumnMigration.down.schema).toBe(project.uuid);
    expect(addColumnMigration.down.from).toBe(nextValue.name);
    expect(addColumnMigration.down.to).toBe(prevValue.name);
  });
});

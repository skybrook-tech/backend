import renameTable from "../../../models/migration-templates/rename-table";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/migration-templates/createTable", () => {
  const project = { id: 24, uuid: "some-uuid" };
  const prevValue = { id: 1, name: "oldName" };
  const nextValue = { id: 1, name: "newName" };

  it("returns createTable migration", () => {
    const renameTableMigration = renameTable({ project, prevValue, nextValue });

    expect(renameTableMigration.type).toBe(migrationTypes.RENAME_TABLE);
    expect(renameTableMigration.isMigrated).toBe(false);
    expect(renameTableMigration.projectId).toBe(project.id);

    expect(renameTableMigration.up.action).toBe(migrationTypes.RENAME_TABLE);
    expect(renameTableMigration.up.schema).toBe(project.uuid);
    expect(renameTableMigration.up.from).toBe(prevValue);
    expect(renameTableMigration.up.to).toBe(nextValue);

    expect(renameTableMigration.down.action).toBe(migrationTypes.RENAME_TABLE);
    expect(renameTableMigration.down.schema).toBe(project.uuid);
    expect(renameTableMigration.down.from).toBe(nextValue);
    expect(renameTableMigration.down.to).toBe(prevValue);
  });
});

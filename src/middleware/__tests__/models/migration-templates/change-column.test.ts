import changeColumn from "../../../models/migration-templates/change-column";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/migration-templates/changeColumn", () => {
  const project = { id: 24, uuid: "some-uuid" };
  const model = { id: 200, name: "mockModel" };
  const nextValue = { name: "mockColumn", type: "STRING", options: {} };
  const prevValue = { name: "mockColumn", type: "INTEGER", options: {} };

  it("returns changeColumn migration", () => {
    const changeColumnMigration = changeColumn({ project, model, nextValue, prevValue });

    expect(changeColumnMigration.type).toBe(migrationTypes.CHANGE_COLUMN);
    expect(changeColumnMigration.isMigrated).toBe(false);
    expect(changeColumnMigration.projectId).toBe(project.id);

    expect(changeColumnMigration.up.action).toBe(migrationTypes.CHANGE_COLUMN);
    expect(changeColumnMigration.up.tableName).toBe(model.name);
    expect(changeColumnMigration.up.schema).toBe(project.uuid);
    expect(changeColumnMigration.up.to).toBe(nextValue);
    expect(changeColumnMigration.up.from).toBe(prevValue);

    expect(changeColumnMigration.down.action).toBe(migrationTypes.CHANGE_COLUMN);
    expect(changeColumnMigration.down.tableName).toBe(model.name);
    expect(changeColumnMigration.down.schema).toBe(project.uuid);
    expect(changeColumnMigration.down.to).toBe(prevValue);
    expect(changeColumnMigration.down.from).toBe(nextValue);
  });
});

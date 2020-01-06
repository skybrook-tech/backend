import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import renameTableMigrator from "../../../../projects/migrate/migrators/rename-table";
import addColumnMigrator from "../../../../projects/migrate/migrators/add-column";
import createProject from "../../../../../factories/project";
import createModel from "../../../../../factories/model";
import createColumn from "../../../../../factories/column";
import db from "../../../../../db/models";
import migrationTemplates from "../../../../models/migration-templates";

describe("middleware/projects/migrate/migrators/renameTable", () => {
  let project: any;
  let model: any;
  let column: any;
  let createTableMigration: any;
  let addColumnMigration: any;
  let renameTableMigration: any;
  const oldName = "oldModelName";
  const newName = "newModelName";

  beforeAll(async () => {
    project = await createProject();
    // @ts-ignore
    model = await createModel({ props: { name: oldName } });
    column = await createColumn({ props: { modelId: model.id, name: "MODEL_COLUMN" } });

    createTableMigration = await db.Migrations.create(
      migrationTemplates.createTable({ project, model })
    );
    addColumnMigration = await db.Migrations.create(
      migrationTemplates.addColumn({
        project,
        model,
        prevValue: null,
        nextValue: column.dataValues
      })
    );
    renameTableMigration = await db.Migrations.create(
      migrationTemplates.renameTable({
        project,
        prevValue: model.dataValues,
        nextValue: { ...model.dataValues, name: newName }
      })
    );

    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);
    await createTableMigrator.up(createTableMigration);
    await addColumnMigrator.up(addColumnMigration);
  });

  afterAll(async () => {
    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, { cascade: true });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  describe("when run agains database", () => {
    it("renames a table and updates migration to isMigrated: true", async () => {
      const selectTableQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_type='BASE TABLE'
      AND table_schema='${project.uuid}';`;

      const getColumnQuery = `
      SELECT *
      FROM information_schema.columns
      WHERE table_schema = '${project.uuid}'
      AND column_name = '${column.name}';`;

      const [[modelColumn]] = await db.sequelize.query(getColumnQuery);
      const [tables] = await db.sequelize.query(selectTableQuery);

      expect(tables.find(({ table_name }) => table_name === oldName)).toBeTruthy();
      expect(tables.find(({ table_name }) => table_name === newName)).toBeFalsy();
      // @ts-ignore
      expect(modelColumn.table_name).toBe(oldName);

      await renameTableMigrator.up(renameTableMigration);
      const updatedMigration = await db.Migrations.findByPk(renameTableMigration.id);
      const [tablesAfterMigration] = await db.sequelize.query(selectTableQuery);
      const [[modelColumnAfterMigration]] = await db.sequelize.query(getColumnQuery);

      expect(updatedMigration.isMigrated).toBe(true);
      expect(tablesAfterMigration.find(({ table_name }) => table_name === newName)).toBeTruthy();
      expect(tablesAfterMigration.find(({ table_name }) => table_name === oldName)).toBeFalsy();
      // @ts-ignore
      expect(modelColumnAfterMigration.table_name).toBe(newName);
    });
  });
});

import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import addColumnMigrator from "../../../../projects/migrate/migrators/add-column";
import removeColumnMigrator from "../../../../projects/migrate/migrators/remove-column";
import createProject from "../../../../../factories/project";
import createModel from "../../../../../factories/model";
import createColumn from "../../../../../factories/column";
import db from "../../../../../db/models";
import migrationTemplates from "../../../../models/migration-templates";

describe("middleware/projects/migrate/migrators/addColumn", () => {
  let project: any;
  let model: any;
  let column: any;
  let createTableMigration: any;
  let addColumnMigration: any;
  let removeColumnMigration: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel();
    column = await createColumn({ props: { modelId: model.id, type: "STRING", name: "before" } });

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
    removeColumnMigration = await db.Migrations.create(
      migrationTemplates.removeColumn({
        project,
        model,
        prevValue: column.dataValues,
        nextValue: column.dataValues
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
    it("creates column and updates migration to isMigrated: true", async () => {
      const getColumnsQuery = `
      SELECT *
      FROM information_schema.columns
      WHERE table_schema = '${project.uuid}'
      AND table_name   = '${model.name}'
      AND column_name   = '${column.name}';`;

      const [columnExists] = await db.sequelize.query(getColumnsQuery);

      expect(columnExists[0]).toBeTruthy();

      await removeColumnMigrator.up(removeColumnMigration);
      const updatedMigration = await db.Migrations.findByPk(addColumnMigration.id);
      const [columnExistsAfterMigration] = await db.sequelize.query(getColumnsQuery);

      expect(columnExistsAfterMigration[0]).toBeFalsy();

      expect(updatedMigration.isMigrated).toBe(true);
    });
  });
});

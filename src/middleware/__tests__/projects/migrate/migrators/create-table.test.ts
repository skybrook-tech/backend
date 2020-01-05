import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import createProject from "../../../../../factories/project";
import createModel from "../../../../../factories/model";
import db from "../../../../../db/models";
import migrationTemplates from "../../../../models/migration-templates";

describe("middleware/projects/migrate/migrators/createTable", () => {
  let project: any;
  let model: any;
  let createTableMigration: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel();
    createTableMigration = await db.Migrations.create(
      migrationTemplates.createTable({ project, model })
    );

    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);
  });

  afterAll(async () => {
    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, { cascade: true });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  describe("when run agains database", () => {
    it("creates a new table on specified schema and updates migration to isMigrated: true", async () => {
      const selectTableQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_type='BASE TABLE'
      AND table_schema='${project.uuid}'
      AND table_name='${model.name}';`;

      const [tableBeforeMigration] = await db.sequelize.query(selectTableQuery);

      expect(tableBeforeMigration[0]).toBeFalsy();

      await createTableMigrator.up(createTableMigration);
      const updatedMigration = await db.Migrations.findByPk(createTableMigration.id);
      const [tableAfterMigration] = await db.sequelize.query(selectTableQuery);

      expect(updatedMigration.isMigrated).toBe(true);
      expect(tableAfterMigration[0]).toBeTruthy();
    });
  });
});

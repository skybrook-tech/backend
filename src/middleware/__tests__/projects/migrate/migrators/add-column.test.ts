import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import addColumnMigrator from "../../../../projects/migrate/migrators/add-column";
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

  beforeAll(async () => {
    project = await createProject();
    model = await createModel();
    column = await createColumn({ props: { modelId: model.id, type: "STRING" } });

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

    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);
    await createTableMigrator.up(createTableMigration);
  });

  afterAll(async () => {
    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, { cascade: true });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  describe("when run agains database", () => {
    it("adds column to table and updates migration to isMigrated: true", async () => {
      const getColumnQuery = `
      SELECT *
      FROM information_schema.columns
      WHERE table_schema = '${project.uuid}'
      AND table_name   = '${model.name}'
      AND column_name   = '${column.name}'`;

      const [columnBeforeMigration] = await db.sequelize.query(getColumnQuery);

      expect(columnBeforeMigration[0]).toBeFalsy();

      await addColumnMigrator.up(addColumnMigration);
      const updatedMigration = await db.Migrations.findByPk(addColumnMigration.id);
      const [columnAfterMigration] = await db.sequelize.query(getColumnQuery);

      expect(columnAfterMigration[0]).toBeTruthy();
      // @ts-ignore
      expect(columnAfterMigration[0].data_type).toBe("character varying");
      expect(updatedMigration.isMigrated).toBe(true);
    });
  });
});

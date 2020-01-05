import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import dropTableMigrator from "../../../../projects/migrate/migrators/drop-table";
import createProject from "../../../../../factories/project";
import createModel from "../../../../../factories/model";
import db from "../../../../../db/models";
import migrationTemplates from "../../../../models/migration-templates";

describe("middleware/projects/migrate/migrations/dropTable", () => {
  let project: any;
  let model: any;
  let createTableMigration: any;
  let dropTableMigration: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel();
    createTableMigration = await db.Migrations.create(
      migrationTemplates.createTable({ project, model })
    );
    dropTableMigration = await db.Migrations.create(
      migrationTemplates.dropTable({ project, model })
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

  it("runs createTable migration against specified postgres schema", async () => {
    await dropTableMigrator.up(dropTableMigration);

    const [table] = await db.sequelize.query(`SELECT table_name
    FROM information_schema.tables
    WHERE table_type='BASE TABLE'
    AND table_schema='${project.uuid}'
    AND table_name='${model.name}';`);

    expect(table[0]).toBeFalsy();
  });
});

import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import { Request, Response } from "express";
import createProject from "../../../../../factories/project";
import createModel from "../../../../../factories/model";
import db from "../../../../../db/models";
import migrationTemplates from "../../../../models/migration-templates";

describe("middleware/projects/migrate/migrators/createTable", () => {
  let project: any;
  let model: any;
  let migration: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel();
    migration = await db.Migrations.create(migrationTemplates.createTable({ project, model }));

    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);
  });

  afterAll(async () => {
    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, { cascade: true });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("runs createTable migration against specified postgres schema", async () => {
    await createTableMigrator.up(migration);

    const [tables] = await db.sequelize.query(`SELECT table_name
    FROM information_schema.tables
    WHERE table_type='BASE TABLE'
    AND table_schema='${project.uuid}';`);

    const newTable = tables.find(({ table_name }) => table_name === model.name);

    expect(newTable).toBeTruthy();
  });
});

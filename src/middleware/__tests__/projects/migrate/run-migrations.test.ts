import runMigrations from "../../../projects/migrate/run-migrations";
import { Request, Response } from "express";
import createProject from "../../../../factories/project";
import createModel from "../../../../factories/model";
import createColumn from "../../../../factories/column";
import db from "../../../../db/models";
import { createMigrationSwitch } from "../../../models/before-update/get-changed-cols-and-migrations";
import migrationTemplates from "../../../models/migration-templates";

describe("middleware/projects/migrate/runMigrations", () => {
  let project: any;
  let modelOne: any;
  let modelOneColOne: any;
  let modelOneColTwo: any;
  let modelTwo: any;

  beforeAll(async () => {
    project = await createProject();

    modelOne = await createModel({ props: { name: "modelOne" } });
    modelOneColOne = await createColumn({ props: { modelId: modelOne.id } });
    modelOneColTwo = await createColumn({ props: { modelId: modelOne.id } });
    modelOne = await db.Models.findOne({
      where: { id: modelOne.id },
      // @ts-ignore
      include: db.Models.getIncluded(db)
    });

    modelTwo = await createModel({ props: { name: "modelTwo" } });

    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);
    await db.Migrations.create(migrationTemplates.createTable({ project, model: modelOne }));
    await db.Migrations.create(migrationTemplates.createTable({ project, model: modelTwo }));
    await db.Migrations.create(
      migrationTemplates.addColumn({
        project,
        model: modelTwo,
        prevValue: null,
        nextValue: modelOneColTwo
      })
    );
  });

  afterAll(async () => {
    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, {
      cascade: true
    });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("runs all migrations that haven't been run yet", async () => {
    const res = {
      locals: { context: { currentProject: project }, response: { data: null } }
    } as Response;

    await runMigrations(res);

    const migrationsAfter = await db.Migrations.findAll();

    expect(migrationsAfter.filter(mgr => mgr.isMigrated).length).toBe(3);
  });
});

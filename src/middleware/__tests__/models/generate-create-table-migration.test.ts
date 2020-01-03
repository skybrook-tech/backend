import generateCreateTableMigration from "../../models/generate-create-table-migration";
import { Request, Response } from "express";
import createProject from "../../../factories/project";
import createModel from "../../../factories/model";
import db from "../../../db/models";

describe("middleware/projects/generateCreateTableMigration", () => {
  let project: any;
  let model: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel({ props: { projectId: project.id } });
  });

  afterAll(async () => {
    await db.Migrations.destroy({ where: {} });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("creates a schema for project in postgres", async () => {
    const req = { body: {} } as Request;
    const res = {
      locals: { response: { data: model }, context: { pathIds: { projectId: project.id } } }
    } as Response;
    const next = jest.fn();

    await generateCreateTableMigration(req, res, next);

    const migrations = await db.Migrations.findAll();

    expect(migrations.length).toBeTruthy();
  });
});

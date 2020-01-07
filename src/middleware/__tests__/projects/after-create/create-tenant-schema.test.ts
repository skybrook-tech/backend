import createTenantSchema from "../../../projects/after-create/create-tenant-schema";
import { Request, Response } from "express";
import createProject from "../../../../factories/project";
import db from "../../../../db/models";

describe("middleware/projects/createTenantSchema", () => {
  let project: any;

  beforeAll(async () => {
    project = await createProject();
  });

  afterAll(async () => {
    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, {
      cascade: true
    });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("creates a schema for project in postgres", async () => {
    const req = { body: {} } as Request;
    const res = { locals: { response: { data: project } } } as Response;
    const next = jest.fn();

    await createTenantSchema(req, res, next);

    const [schemas] = await db.sequelize.query(
      "SELECT schema_name FROM information_schema.schemata;"
    );

    const newSchema = schemas.find(({ schema_name }) => schema_name === project.uuid);

    expect(newSchema).toBeTruthy();
  });
});

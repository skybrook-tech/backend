import dropTenantSchema from "../../projects/drop-tenant-schema";
import { Request, Response } from "express";
import createProject from "../../../factories/project";
import db from "../../../db/models";

describe("middleware/projects/dropTenantSchema", () => {
  let project: any;

  beforeAll(async () => {
    project = await createProject();
    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);
  });

  afterAll(async () => {
    // @ts-ignore
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("creates a schema for project in postgres", async () => {
    const req = { params: {} } as Request;
    req.params.id = project.id;
    const res = {} as Response;
    const next = jest.fn();

    await dropTenantSchema(req, res, next);

    const [schemas] = await db.sequelize.query(
      "SELECT schema_name FROM information_schema.schemata;"
    );

    const newSchema = schemas.find(({ schema_name }) => schema_name === project.uuid);

    expect(newSchema).toBeFalsy();
  });
});

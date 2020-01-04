import afterCreate from "../../models/after-create";
import { Request, Response } from "express";
import createProject from "../../../factories/project";
import createModel from "../../../factories/model";
import db from "../../../db/models";
import migrationTypes from "../../../constants/migration-types";

describe("middleware/projects/afterCreate", () => {
  let project: any;
  let model: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel({
      props: {
        projectId: project.id,
        columns: [
          { name: "col1", type: "STRING" },
          { name: "col2", type: "STRING" },
          { name: "col3", type: "STRING" }
        ]
      }
    });
  });

  afterAll(async () => {
    await db.Migrations.destroy({ where: {} });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("creates a new createTable migration", async () => {
    const req = { body: {} } as Request;
    const res = {
      locals: { response: { data: model }, context: { currentProject: project } }
    } as Response;
    const next = jest.fn();

    await afterCreate(req, res, next);

    const migrations = await db.Migrations.findAll();

    expect(migrations.length).toBeTruthy();
    expect(migrations[0].type).toBe(migrationTypes.CREATE_TABLE);
    expect(migrations[0].isMigrated).toBe(false);

    expect(migrations[0].up.action).toBe(migrationTypes.CREATE_TABLE);
    expect(migrations[0].up.tableName).toBe(model.name);
    expect(migrations[0].up.columns.length).toBe(3);
    expect(migrations[0].up.schema).toBe(project.uuid);

    expect(migrations[0].down.action).toBe(migrationTypes.DROP_TABLE);
    expect(migrations[0].down.tableName).toBe(model.name);
    expect(migrations[0].down.schema).toBe(project.uuid);
  });
});

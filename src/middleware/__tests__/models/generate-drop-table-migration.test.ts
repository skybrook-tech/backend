import generateDropTableMigration from "../../models/generate-drop-table-migration";
import { Request, Response } from "express";
import createProject from "../../../factories/project";
import createModel from "../../../factories/model";
import db from "../../../db/models";
import migrationTypes from "../../../constants/migration-types";

describe("middleware/projects/generateDropTableMigration", () => {
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
    const req = { params: {} } as Request;
    req.params.id = model.id;

    const res = {
      locals: { context: { pathIds: { projectId: project.id } } }
    } as Response;

    const next = jest.fn();

    await generateDropTableMigration(req, res, next);

    const migrations = await db.Migrations.findAll();

    expect(migrations.length).toBeTruthy();
    expect(migrations.length).toBeTruthy();
    expect(migrations[0].type).toBe(migrationTypes.DROP_TABLE);
    expect(migrations[0].isMigrated).toBe(false);

    expect(migrations[0].down.action).toBe(migrationTypes.CREATE_TABLE);
    expect(migrations[0].down.tableName).toBe(model.name);
    expect(migrations[0].down.columns.length).toBe(3);
    expect(migrations[0].down.schema).toBe(project.uuid);

    expect(migrations[0].up.action).toBe(migrationTypes.DROP_TABLE);
    expect(migrations[0].up.tableName).toBe(model.name);
    expect(migrations[0].up.schema).toBe(project.uuid);
  });
});

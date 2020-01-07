import handleTableName from "../../../models/before-update/handle-table-name";
import { Request, Response } from "express";
import createProject from "../../../../factories/project";
import createModel from "../../../../factories/model";
import db from "../../../../db/models";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/before-update/handleTableName", () => {
  let project: any;
  let model: any;
  const oldName = "oldName";
  const newName = "newName";

  beforeAll(async () => {
    project = await createProject();
    model = await createModel({ props: { projectId: project.id, name: oldName } });
  });

  afterAll(async () => {
    await db.Migrations.destroy({ where: {} });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("creates renameTable migration when model name is changed", async () => {
    const req = { params: {}, body: {} } as Request;
    req.params.id = model.id;

    req.body.columns = [];
    req.body.name = newName;

    const res = {
      locals: { context: { currentProject: project } }
    } as Response;

    const next = jest.fn();

    await handleTableName(req, res, next);

    const migrationRecords = await db.Migrations.findAll({ where: { projectId: project.id } });

    expect(migrationRecords[0].type).toBe(migrationTypes.RENAME_TABLE);
    expect(migrationRecords[0].up.from.name).toBe(oldName);
    expect(migrationRecords[0].up.to.name).toBe(newName);
    expect(migrationRecords[0].down.to.name).toBe(oldName);
    expect(migrationRecords[0].down.from.name).toBe(newName);
  });
});

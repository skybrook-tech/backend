import handleColumns from "../../../models/before-update/handle-columns";
import { Request, Response } from "express";
import createProject from "../../../../factories/project";
import createModel from "../../../../factories/model";
import createColumn from "../../../../factories/column";
import db from "../../../../db/models";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/before-update/handleColumns", () => {
  let project: any;
  let model: any;
  let col1: any;
  let col2: any;
  let col3: any;
  let col4: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel({ props: { projectId: project.id } });

    col1 = await createColumn({ props: { modelId: model.id } });
    col2 = await createColumn({ props: { modelId: model.id } });
    col3 = await createColumn({ props: { modelId: model.id } });
    col4 = await createColumn({ props: { modelId: model.id } });
  });

  afterAll(async () => {
    await db.Migrations.destroy({ where: {} });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("handles bulk CRUD of columns and relevant migrations on existing models", async () => {
    const req = { params: {}, body: {} } as Request;
    req.params.id = model.id;

    const expectedNewColumn = { name: "newColumn", type: "INTEGER" };
    const expectedMigrationTypes = [
      migrationTypes.CHANGE_COLUMN,
      migrationTypes.RENAME_COLUMN,
      migrationTypes.REMOVE_COLUMN,
      migrationTypes.ADD_COLUMN
    ];
    const col1ExpectedChange = "INTEGER";
    const col3ExpectedChange = "foo";

    req.body.columns = [
      { ...col1.dataValues, type: "INTEGER" },
      col2.dataValues,
      { ...col3.dataValues, name: "foo" },
      { ...col4.dataValues, _delete: true },
      expectedNewColumn
    ];

    const res = {
      locals: { context: { currentProject: project } }
    } as Response;

    const next = jest.fn();

    await handleColumns(req, res, next);

    const migrationRecords = await db.Migrations.findAll({ where: { projectId: project.id } });
    const updatedCol1 = await db.Columns.findOne({ where: { id: col1.id } });
    const updatedCol3 = await db.Columns.findOne({ where: { id: col3.id } });
    const deletedCol4 = await db.Columns.findOne({ where: { id: col4.id } });
    const newColumn = await db.Columns.findOne({ where: { name: expectedNewColumn.name } });

    const actualMigrationTypes = migrationRecords.map(({ type }) => type);

    expect(updatedCol1.type).toBe(col1ExpectedChange);
    expect(updatedCol3.name).toBe(col3ExpectedChange);
    expect(deletedCol4).toBeFalsy();
    expect(newColumn).toHaveProperty("id");

    expect(actualMigrationTypes).toStrictEqual(expectedMigrationTypes);
  });
});

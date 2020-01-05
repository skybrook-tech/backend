import getChangedColsAndMigrations from "../../../models/before-update/get-changed-cols-and-migrations";
import { Request, Response } from "express";
import createProject from "../../../../factories/project";
import createModel from "../../../../factories/model";
import createColumn from "../../../../factories/column";
import db from "../../../../db/models";
import migrationTypes from "../../../../constants/migration-types";

describe("middleware/models/before-update/getChangedColsAndMigrations", () => {
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

  it("returns migrations, deletedColumns and newAndUpdatedColumns arrays correctly filtered", async () => {
    const req = { params: {}, body: {} } as Request;
    req.params.id = model.id;

    req.body.columns = [
      { ...col1.dataValues, type: "INTEGER" },
      col2.dataValues,
      { ...col3.dataValues, name: "foo" },
      { ...col4.dataValues, _delete: true }
    ];

    const res = {
      locals: { context: { currentProject: project } }
    } as Response;

    const result = await getChangedColsAndMigrations(req, res);

    const expectedMigrationTypes = [
      migrationTypes.CHANGE_COLUMN,
      migrationTypes.RENAME_COLUMN,
      migrationTypes.REMOVE_COLUMN
    ];
    const actualMigrationTypes = result.migrations.map(({ type }) => type);

    expect(result).toHaveProperty("migrations");
    expect(result).toHaveProperty("newAndUpdatedColumns");
    expect(result).toHaveProperty("deletedColumns");

    expect(actualMigrationTypes).toStrictEqual(expectedMigrationTypes);

    expect(result.migrations.length).toBe(3);
    expect(result.newAndUpdatedColumns.length).toBe(2);
    expect(result.deletedColumns.length).toBe(1);
  });
});

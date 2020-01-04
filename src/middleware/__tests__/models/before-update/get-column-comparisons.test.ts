import getColumnComparisons from "../../../models/before-update/get-column-comparisons";
import { Request, Response } from "express";
import createProject from "../../../../factories/project";
import createModel from "../../../../factories/model";
import createColumn from "../../../../factories/column";
import db from "../../../../db/models";

describe("middleware/models/before-update/getColumnComparisons", () => {
  let project: any;
  let model: any;
  let col1: any;
  let col2: any;

  beforeAll(async () => {
    project = await createProject();
    model = await createModel({ props: { projectId: project.id } });

    col1 = await createColumn({ props: { modelId: model.id } });
    col2 = await createColumn({ props: { modelId: model.id } });
  });

  afterAll(async () => {
    await db.Migrations.destroy({ where: {} });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  it("returns array with prevValue nextValue & migration", async () => {
    const req = { params: {}, body: {} } as Request;
    req.params.id = model.id;
    req.body.columns = [col1, col2];

    const res = {
      locals: { context: { currentProject: project } }
    } as Response;

    const result = await getColumnComparisons(req, res);

    result.forEach(colComparison => {
      expect(colComparison).toHaveProperty("prevValue");
      expect(colComparison).toHaveProperty("nextValue");
      expect(colComparison).toHaveProperty("migration");
    });
  });
});

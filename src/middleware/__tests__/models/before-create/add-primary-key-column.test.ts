import addPrimaryKeyColumn from "../../../models/before-create/add-primary-key-column";
import { Request, Response } from "express";

describe("models/before-create/add-primary-key-column", () => {
  it("adds primaryKey column to req.body.columns if primaryKey doesn't already exist", async () => {
    const expected = {
      name: "id",
      type: "INTEGER",
      options: { allowNull: false, autoIncrement: true, primaryKey: true }
    };

    const req = { body: { columns: [] } } as Request;

    const res = {
      locals: { context: {} }
    } as Response;

    const next = jest.fn();

    await addPrimaryKeyColumn(req, res, next);

    const actual = req.body.columns.find((col: any) => col.name === expected.name);

    expect(actual).toStrictEqual(expected);
  });

  it("skips if primaryKey already exists", async () => {
    const expected = {
      name: "customPrimaryKey",
      type: "INTEGER",
      options: { allowNull: false, autoIncrement: true, primaryKey: true }
    };

    const req = { body: { columns: [expected] } } as Request;

    const res = {
      locals: { context: {} }
    } as Response;

    const next = jest.fn();

    await addPrimaryKeyColumn(req, res, next);

    const actual = req.body.columns.find((col: any) => col.name === expected.name);
    const addedPrimaryKey = req.body.columns.find((col: any) => col.name === "id");

    expect(actual).toStrictEqual(expected);
    expect(addedPrimaryKey).toBeFalsy();
  });
});

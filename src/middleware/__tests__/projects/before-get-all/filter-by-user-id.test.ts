import { Request, Response } from "express";
import filterByUserId from "../../../projects/before-get-all/filter-by-user-id";

describe("middleware/projects/filterByUserId", () => {
  it("adds userId to req.body.criteria", async () => {
    const expectedId = 1;

    const req = { body: {} } as Request;
    const res = { locals: { currentUser: { id: expectedId } } } as Response;
    const next = jest.fn();

    await filterByUserId(req, res, next);

    const actual = req.body.criteria.userId;

    expect(actual).toBe(expectedId);
  });
});

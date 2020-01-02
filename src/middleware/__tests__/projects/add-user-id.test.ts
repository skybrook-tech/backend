import addUserId from "../../projects/add-user-id";
import { Request, Response } from "express";

describe("projects --- addUserId", () => {
  const expectedId = 1;

  it("adds current user id to req.body.userId", async () => {
    const req = { body: {} } as Request;
    const res = { locals: { currentUser: { id: expectedId } } } as Response;
    const next = jest.fn();

    addUserId(req, res, next);

    expect(req.body.userId).toBe(expectedId);
    expect(next.mock.calls.length).toBe(1);
  });
});

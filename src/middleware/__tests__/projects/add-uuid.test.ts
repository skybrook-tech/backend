import addUUID, { generateUUID } from "../../projects/add-uuid";
import isString from "lodash/isString";
import { Request, Response } from "express";

describe("projects --- generateUUID", () => {
  it("generates a UUID usingadjective-adjective-animal", async () => {
    const generatedUUID = await generateUUID();

    expect(generatedUUID).not.toBeNull();
    expect(isString(generatedUUID)).toBeTruthy();
  });
});

describe("projects --- addUUID middleware", () => {
  it("adds UUID to req.body.uuid", async () => {
    const req = { body: {} } as Request;
    const res = { locals: { currentUser: {} } } as Response;
    const next = jest.fn();

    await addUUID(req, res, next);

    expect(req.body.uuid).not.toBeNull();
    expect(isString(req.body.uuid)).toBeTruthy();
  });
});

import isOwner from "../../authorization/is-project-owner";
import createProject from "../../../factories/project";
import createUser from "../../../factories/user";
import { Request, Response } from "express";

describe("middleware/models/authorisation/create: isOwner --- when currentUserId matches project.userId", () => {
  it("returns true", async () => {
    const user = await createUser();
    const project = await createProject({ props: { userId: user.id } });

    const req = { body: { projectId: project.id } } as Request;
    const res = { locals: { currentUser: user } } as Response;

    const expected = true;
    const actual = await isOwner(req, res);

    expect(actual).toBe(expected);
  });
});

describe("middleware/models/authorisation/create: isOwner --- when currentUserId does not match project.userId", () => {
  it("returns false", async () => {
    const user = await createUser();
    const project = await createProject({ props: { userId: user.id } });

    const req = { body: { projectId: project.id } } as Request;
    const res = { locals: { currentUser: { id: 0 } } } as Response;

    const expected = false;
    const actual = await isOwner(req, res);

    expect(actual).toBe(expected);
  });
});

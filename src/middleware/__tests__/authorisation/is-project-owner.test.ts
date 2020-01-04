import isOwner from "../../authorization/is-project-owner";
import createProject from "../../../factories/project";
import createUser from "../../../factories/user";
import { Request, Response } from "express";
import db from "../../../db/models";

afterAll(async () => {
  await db.Projects.destroy({ where: {} });
  await db.Users.destroy({ where: {} });
});

describe("middleware/models/authorisation/create: isOwner --- when currentUserId matches project.userId", () => {
  it("returns true", async () => {
    const user = await createUser();
    const project = await createProject({ props: { userId: user.id } });

    const req = {} as Request;
    const res = {
      locals: {
        currentUser: user,
        context: { currentProject: project, pathIds: { projectId: project.id } }
      }
    } as Response;

    const expected = true;
    const actual = await isOwner(req, res);

    expect(actual).toBe(expected);
  });
});

describe("middleware/models/authorisation/create: isOwner --- currentUserId matches params.id for /projects", () => {
  it("returns true", async () => {
    const user = await createUser();
    const project = await createProject({ props: { userId: user.id } });

    const req = {} as Request;
    req.params = {};
    req.params.id = project.id;

    const res = { locals: { context: { currentProject: project }, currentUser: user } } as Response;

    const expected = true;
    const actual = await isOwner(req, res);

    expect(actual).toBe(expected);
  });
});

describe("middleware/models/authorisation/create: isOwner --- when currentUserId does not match project.userId", () => {
  it("returns false", async () => {
    const user = await createUser();
    const project = await createProject({ props: { userId: user.id } });

    const req = {} as Request;
    const res = {
      locals: {
        currentUser: { id: 0 },
        context: { currentProject: project, pathIds: { projectId: project.id } }
      }
    } as Response;

    const expected = false;
    const actual = await isOwner(req, res);

    expect(actual).toBe(expected);
  });
});

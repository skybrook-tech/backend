import isOwner from "../../../models/authorization/is-owner";
import createProject from "../../../../factories/project";
import createUser from "../../../../factories/user";

describe("middleware/models/authorisation/create: isOwner --- when currentUserId matches project.userId", () => {
  it("returns true", async () => {
    const user = await createUser();
    const project = await createProject({ props: { userId: user.id } });

    const ids = { projectId: project.id, currentUserId: user.id };

    const expected = true;
    const actual = await isOwner(ids);

    expect(actual).toBe(expected);
  });
});

describe("middleware/models/authorisation/create: isOwner --- when currentUserId does not match project.userId", () => {
  it("returns false", async () => {
    const user = await createUser();
    const project = await createProject({ props: { userId: user.id } });

    const ids = { projectId: project.id, currentUserId: 0 };

    const expected = false;
    const actual = await isOwner(ids);

    expect(actual).toBe(expected);
  });
});

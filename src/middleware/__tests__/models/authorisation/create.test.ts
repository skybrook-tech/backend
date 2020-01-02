import canCreate from "../../../models/authorization/create";
import { Request, Response } from "express";
import createProject from "../../../../factories/project";
import createUser from "../../../../factories/user";
import errors from "../../../../errors";

const targetMiddleware = "middleware/models/authorisation/create: ";

interface UserAndProject {
  user: any;
  project: any;
}

interface TestCase {
  description: string;
  expected: any;
  should: string;
  getUserAndProject: () => Promise<UserAndProject>;
}

const testCases = [
  {
    description: `${targetMiddleware} when the currentUser owns project`,
    expected: undefined,
    should: "calls next without arguments and lets post request through",
    getUserAndProject: async () => {
      const user = await createUser();
      const project = await createProject({ props: { userId: user.id } });

      return { user, project };
    }
  },
  {
    description: `${targetMiddleware} when the currentUser doesn't own project`,
    expected: errors.authorization.NOT_AUTHORIZED,
    should: "calls next without an error and passes to error-handler",
    getUserAndProject: async () => {
      const projectCreator = await createUser();
      const project = await createProject({ props: { userId: projectCreator.id } });

      const user = await createUser();

      return { user, project };
    }
  }
] as TestCase[];

testCases.forEach(testCase => {
  describe(testCase.description, () => {
    it(testCase.should, async () => {
      const { user, project } = await testCase.getUserAndProject();

      const req = { body: { projectId: project.id } } as Request;
      const res = { locals: { currentUser: { id: user.id } } } as Response;
      const next = jest.fn();

      await canCreate(req, res, next);

      expect(next.mock.calls[0][0]).toBe(testCase.expected);
    });
  });
});

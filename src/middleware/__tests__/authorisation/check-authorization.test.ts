import checkAuthorization from "../../authorization/check-authorization";
import { Request, Response } from "express";
import errors from "../../../errors";

interface TestCase {
  description: string;
  expected: any;
  should: string;
  req: any;
  res: any;
}

const authExampleOne = (req: Request, res: Response) => {
  return new Promise(resolve => {
    resolve(req.body.criteriaOne === res.locals.criteriaOneMirror);
  });
};

const authExampleTwo = (req: Request, res: Response) => {
  return new Promise(resolve => {
    resolve(req.body.criteriaTwo === res.locals.criteriaTwoMirror);
  });
};

const testCases = [
  {
    description: `checkAuthentication --- when all authFunctions return true`,
    expected: undefined,
    should: "calls next without arguments and lets post request through",
    req: { body: { criteriaOne: 1, criteriaTwo: 2 } },
    res: { locals: { criteriaOneMirror: 1, criteriaTwoMirror: 2 } }
  },
  {
    description: `checkAuthentication --- when one or more auth functions return false`,
    expected: errors.authorization.NOT_AUTHORIZED,
    should: "calls next without an error and passes to error-handler",
    req: { body: { criteriaOne: 1, criteriaTwo: 2 } },
    res: { locals: { criteriaOneMirror: 1, criteriaTwoMirror: 1 } }
  }
] as TestCase[];

testCases.forEach(testCase => {
  describe(testCase.description, () => {
    it(testCase.should, async () => {
      const req = testCase.req as Request;
      const res = testCase.res as Response;
      const next = jest.fn();

      await checkAuthorization([authExampleOne, authExampleTwo])(req, res, next);

      expect(next.mock.calls[0][0]).toBe(testCase.expected);
    });
  });
});

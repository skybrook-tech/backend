import express from "express";
import request from "supertest";
import errors from "../../errors";
import db from "../../db/models";
import controllers from "../index";
import setupServerDefaults from "../../utils/setup-server-defaults";
import dbUtils from "../../utils/test-utils/db";

const router = express.Router();
const app = setupServerDefaults({ routes: router.use("/users", controllers.users) });

interface UserType {
  email: string;
  password: string;
}

const existingUser = { email: "existing@email.com", password: "password" } as UserType;

beforeAll(async () => {
  await dbUtils.migrate();

  await request(app)
    .post("/users/register")
    .set("Accept", "application/json")
    .send(existingUser);
});

afterAll(async () => {
  await db.Users.destroy({ where: {}, truncate: true });
});

const testCases = {
  validations: [
    {
      description: "sends error when no email provided",
      expected: errors.authentication.AUTH_NO_P_OR_U,
      requestBody: { email: null, password: "password" } as UserType
    },
    {
      description: "sends error when no password provided",
      expected: errors.authentication.AUTH_NO_P_OR_U,
      requestBody: { email: "foo", password: null } as UserType
    },
    {
      description: "sends error when user already exists",
      expected: errors.authentication.AUTH_USER_EXISTS,
      requestBody: existingUser,
      beforeFunction: (app: any) => {
        return;
      }
    }
  ]
};

describe("users controller --- POST '/users/register' --- validations", () => {
  const testFunc = ({
    description,
    expected,
    requestBody,
    beforeFunction
  }: {
    description: string;
    expected: any;
    requestBody: any;
    beforeFunction: () => void;
  }) => {
    it(description, async done => {
      if (beforeFunction) await beforeFunction;

      request(app)
        .post("/users/register")
        .set("Accept", "application/json")
        .send(requestBody)
        .expect("Content-Type", /json/)
        .expect({ error: expected })
        .expect(expected.status)
        .end(done);
    });
  };

  testCases.validations.forEach(testFunc);
});

describe("users controller --- POST '/users/register' --- success", () => {
  const newUserAccount = { email: "new_user@email.com", password: "password" } as UserType;
  const expected = { status: 200 };

  it("creates a new user account and response with jwt", async done => {
    request(app)
      .post("/users/register")
      .set("Accept", "application/json")
      .send(newUserAccount)
      .expect(res => {
        expect(res.body.token).toBeTruthy();
      })
      .expect("Content-Type", /json/)
      .expect(expected.status)
      .end(done);
  });
});

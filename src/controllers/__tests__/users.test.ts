import express from "express";
import request from "supertest";
import errors from "../../errors";
import { ErrorResponse } from "../../errors/types";
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
const newUserAccount = { email: "new_user@email.com", password: "password" } as UserType;

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
  registerValidations: [
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
      requestBody: existingUser
    }
  ],
  loginValidations: [
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
      description: "sends error when user does not exist",
      expected: errors.authentication.AUTH_USER_NOT_FOUND,
      requestBody: { email: "foo@bar.com", password: "password" } as UserType
    },
    {
      description: "sends error when password incorrect",
      expected: errors.authentication.AUTH_USER_WRONG_PW,
      requestBody: { ...existingUser, password: "wrong_password" } as UserType
    }
  ]
};

interface TestFuncArgs {
  description: string;
  expected: ErrorResponse;
  requestBody: any;
  beforeFunction: () => void;
}

describe("users controller --- POST '/users/register' --- validations", () => {
  const testFunc = ({ description, expected, requestBody, beforeFunction }: TestFuncArgs) => {
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

  testCases.registerValidations.forEach(testFunc);
});

describe("users controller --- POST '/users/register' --- success", () => {
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

describe("users controller --- POST '/users/login' --- validations", () => {
  const testFunc = ({ description, expected, requestBody, beforeFunction }: TestFuncArgs) => {
    it(description, async done => {
      if (beforeFunction) await beforeFunction;

      request(app)
        .post("/users/login")
        .set("Accept", "application/json")
        .send(requestBody)
        .expect("Content-Type", /json/)
        .expect({ error: expected })
        .expect(expected.status)
        .end(done);
    });
  };

  testCases.loginValidations.forEach(testFunc);
});

describe("users controller --- POST '/users/login' --- success", () => {
  const expected = { status: 200 };

  it("allows user to login and sends JWT", async done => {
    request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(existingUser)
      .expect(res => {
        expect(res.body.token).toBeTruthy();
      })
      .expect("Content-Type", /json/)
      .expect(expected.status)
      .end(done);
  });
});

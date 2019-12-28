import express from "express";
import request from "supertest";
import errors from "../../errors";
import db from "../../db/models";
import controllers from "../index";
import setupServerDefaults from "../../utils/setup-server-defaults";
import dbUtils from "../../utils/test-utils/db";

const router = express.Router();
const app = setupServerDefaults({ routes: router.use("/users", controllers.users) });

const existingUser = { email: "existing@email.com" as string, password: "password" as null };

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

describe("users controller", () => {
  describe("POST /users/register", () => {
    describe("validations", () => {
      [
        {
          description: "sends error when no email provided",
          expected: errors.authentication.AUTH_NO_P_OR_U,
          requestBody: { email: null as null, password: "password" as string }
        },
        {
          description: "sends error when no password provided",
          expected: errors.authentication.AUTH_NO_P_OR_U,
          requestBody: { email: "foo" as string, password: null as null }
        },
        {
          description: "sends error when user already exists",
          expected: errors.authentication.AUTH_USER_EXISTS,
          requestBody: existingUser,
          beforeFunction: (app: any) => {
            return;
          }
        }
      ].forEach(({ description, expected, requestBody, beforeFunction }) => {
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
      });
    });
  });
});

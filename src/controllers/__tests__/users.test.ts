import usersController from "../users";
import express from "express";
import request from "supertest";
import errors from "../../errors";

const initUsersController = () => {
  const app = express();
  app.use("/users", usersController);

  return app;
};

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
        }
      ].forEach(({ description, expected, requestBody }) => {
        it(description, async () => {
          const app = initUsersController();

          request(app)
            .post("/users/register")
            .send(requestBody)
            .expect(expected.status, expected);
        });
      });
    });
  });
});

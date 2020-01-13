import express from "express";
import request from "supertest";
import errors from "../../errors";
import db from "../../db/models";
import controllers from "../../controllers/index";
import setupServerDefaults from "../../core/utils/setup-server-defaults";
import middleware from "../index";

const router = express.Router();

router.get("/private_route", middleware.authentication.requireJwt, (req, res, next) => {
  res.status(200).json({ data: "mockData" });
});

router.use("/users", controllers.users);

const app = setupServerDefaults({ routes: router });

interface UserType {
  email: string;
  password: string;
}

const existingUser = { email: "existing@email.com", password: "password" } as UserType;

beforeAll(async () => {
  await request(app)
    .post("/users/register")
    .set("Accept", "application/json")
    .send(existingUser);
});

afterAll(async () => {
  await db.Users.destroy({ where: {} });
});

const testCases = {
  requireJwt: [
    {
      description: "sends 401 status and error when not authenticated",
      expected: {
        status: errors.authentication.AUTH_NO_TOKEN.status,
        body: { error: errors.authentication.AUTH_NO_TOKEN }
      }
    },
    {
      description: "sends 401 status and error when not authenticated",
      expected: {
        status: errors.authentication.AUTH_INVALID_TOKEN.status,
        body: { error: errors.authentication.AUTH_INVALID_TOKEN }
      },
      getToken: () => {
        return { body: { token: "foo.bar.baz" } };
      }
    },
    {
      description: "sends 200 status and allows access when authenticated",
      expected: { status: 200, body: { data: "mockData" } },
      getToken: () => {
        return request(app)
          .post("/users/login")
          .set("Accept", "application/json")
          .send(existingUser);
      }
    }
  ]
};

describe("authentication middleware --- requireJwt", () => {
  const testFunc = ({
    description,
    expected,

    getToken
  }: {
    description: string;
    expected: any;
    getToken?: () => void;
  }) => {
    it(description, async done => {
      let token = null;

      if (getToken) {
        const res = await getToken();

        // @ts-ignore
        token = res.body.token;
      }

      if (!token) {
        request(app)
          .get("/private_route")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(expected.body)
          .expect(expected.status)
          .end(done);
      } else {
        request(app)
          .get("/private_route")
          .set("Accept", "application/json")
          .set("Authorization", `Bearer ${token}`)
          .expect("Content-Type", /json/)
          .expect(expected.body)
          .expect(expected.status)
          .end(done);
      }
    });
  };

  testCases.requireJwt.forEach(testFunc);
});

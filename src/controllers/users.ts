import express from "express";
import middleware from "../middleware";
import defaultResponse from "../core/middleware/defaults/response";

const router = express.Router();

router.post(
  "/register",
  middleware.users.validations.registration,
  middleware.authentication.register,
  middleware.authentication.signJwtForUser,
  defaultResponse
);

router.post(
  "/login",
  middleware.users.validations.login,
  middleware.authentication.login,
  middleware.authentication.signJwtForUser,
  defaultResponse
);

export default router;

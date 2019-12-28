import express from "express";
import middleware from "../middleware";
import defaultResponse from "../middleware/defaults/response";

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

  // middleware.authentication.login,
  // middleware.authentication.signJwtForUser,
  // middleware.sendResponse.successJson,
  defaultResponse
  // middleware.defaults.response
);

export default router;

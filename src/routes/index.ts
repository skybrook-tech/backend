import express from "express";
import controllers from "../controllers";
import middleware from "../middleware";

const router = express.Router({ mergeParams: true });

// public
router.use("/users", controllers.users);

// private
router.use("/projects", middleware.authentication.requireJwt, controllers.projects.router);

export default router;

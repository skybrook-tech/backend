import express from "express";
import controllers from "../controllers";

const router = express.Router();

router.use("/users", controllers.users);

export default router;

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import middleware from "../middleware";
import bodyParser from "body-parser";

interface Config {
  routes?: any;
}

const setupServerDefaults = (config: Config = {}) => {
  const { routes } = config;

  const app = express();

  dotenv.config();

  app.use((req, res, next) => {
    res.locals.context = {};
    next();
  });

  app.use(express.json());
  app.use(bodyParser.json());

  app.use(cors());
  app.use(middleware.authentication.initializePassport);

  app.use(routes);

  app.use(middleware.errorHandler);

  return app;
};

export default setupServerDefaults;

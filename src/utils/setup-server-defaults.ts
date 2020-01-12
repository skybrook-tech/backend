import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import middleware from "../middleware";
import bodyParser from "body-parser";

interface Config {
  routes?: any;
}

interface Locals {
  context: any;
  response: { data: any };
}

const locals = {
  context: {},
  response: { data: null },
  parent: {}
} as Locals;

const setupServerDefaults = (config: Config = {}) => {
  const { routes } = config;

  const app = express();

  dotenv.config();

  app.use((req, res, next) => {
    res.locals = { ...locals };

    next();
  });

  app.use(express.json());
  app.use(bodyParser.json());

  app.use(cors());
  app.use(middleware.authentication.initializePassport);
  app.use((req, res, next) => {
    console.log("PROJECTS");
    next();
  });
  app.post("/", (req, res, next) => {
    console.log("PROJECTS");
    res.send();
  });

  app.use(routes);

  app.use(middleware.errorHandler);

  return app;
};

export default setupServerDefaults;

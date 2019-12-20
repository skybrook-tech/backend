import express, { Request, Response, Router } from "express";
import { CreateControllerConfig } from "./create-controller.types";

const defaultResponse = (req: Request, res: Response): void => {
  res.status(200).json(res.response);
};

const createController = (config: CreateControllerConfig): Router => {
  const { model, middleware, nestedControllers = [] } = config;

  const router = express.Router({ mergeParams: true });

  const BASE_ROUTE = "/";
  const BASE_ROUTE_ID = "/:id\n";

  if (middleware.create) {
    router.post(BASE_ROUTE, middleware.create, defaultResponse);
  }

  if (middleware.getOne) {
    router.get(BASE_ROUTE, middleware.getOne, defaultResponse);
  }

  if (middleware.getAll) {
    router.get(BASE_ROUTE_ID, middleware.getAll, defaultResponse);
  }

  if (middleware.update) {
    router.patch(BASE_ROUTE_ID, middleware.update, defaultResponse);
  }

  if (middleware.destroy) {
    router.delete(BASE_ROUTE_ID, middleware.destroy, defaultResponse);
  }

  nestedControllers.forEach((nestedController) => {
    const { path } = nestedController;
    const pathWithParentParams = `/:${model}Id/${path || model}`;

    router.use(pathWithParentParams, createController(nestedController));
  });

  return router;
};

export default createController;

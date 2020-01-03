import * as express from "express";
import defaultResponse from "../middleware/defaults/response";
import pluralize from "pluralize";

import { CreateControllerConfig, CreateControllerResult } from "./create-controller.types";

const addParentId = (parentIdKey: string) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.locals.parent = { parentId: { [parentIdKey]: req.params[parentIdKey] } };
  res.locals.context = { pathIds: { ...req.params } };

  next();
};

const createController = (config: CreateControllerConfig): CreateControllerResult => {
  const { model, path, middleware, nestedControllers = [] } = config;

  const router = express.Router({ mergeParams: true });

  const BASE_ROUTE = `/`;
  const BASE_ROUTE_ID = "/:id";

  const { create, getOne, getAll, update, destroy } = middleware;

  if (create) {
    router.post(BASE_ROUTE, create, defaultResponse);
  }

  if (getOne) {
    router.get(BASE_ROUTE_ID, getOne, defaultResponse);
  }

  if (getAll) {
    router.get(BASE_ROUTE, getAll, defaultResponse);
  }

  if (update) {
    router.patch(BASE_ROUTE_ID, update, defaultResponse);
  }

  if (destroy) {
    router.delete(BASE_ROUTE_ID, destroy, defaultResponse);
  }

  nestedControllers.forEach(nestedController => {
    const { path: nestedPath, model: nestedModel } = nestedController.config;

    const parentIdParam = `${pluralize.singular(model.toLowerCase())}Id`;
    const pathWithParentParams = `/:${parentIdParam}/${nestedPath || nestedModel}`;

    router.use(pathWithParentParams, addParentId(parentIdParam), nestedController.router);
  });

  return { router, config };
};

export default createController;

import * as express from "express";

import {
  CreateControllerConfig,
  CreateControllerResult
} from "./create-controller.types";

const defaultResponse = (
  req: express.Request,
  res: express.Response
): void => {
  res.status(200).json(res.response);
};

const createController = (
  config: CreateControllerConfig
): CreateControllerResult => {
  const {
    model,
    path,
    middleware,
    nestedControllers = []
  } = config;

  const router = express.Router({ mergeParams: true });

  const BASE_ROUTE = `/`;
  const BASE_ROUTE_ID = "/:id\n";

  const {
    create,
    getOne,
    getAll,
    update,
    destroy
  } = middleware;

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

  nestedControllers.forEach((nestedController) => {
    const {
      path: nestedPath,
      model: nestedModel
    } = nestedController.config;

    const pathWithParentParams = `/:${model}Id/${nestedPath ||
      nestedModel}`;

    router.use(
      pathWithParentParams,
      nestedController.router
    );
  });

  return { router, config };
};

export default createController;

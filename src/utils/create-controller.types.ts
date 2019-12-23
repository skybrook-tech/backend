import * as express from "express";

export type MiddlewareFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

interface CreateControllerMiddleware {
  create?: MiddlewareFunction[];
  destroy?: MiddlewareFunction[];
  getAll?: MiddlewareFunction[];
  getOne?: MiddlewareFunction[];
  update?: MiddlewareFunction[];
}

export interface CreateControllerResult {
  config: CreateControllerConfig;
  router?: express.Router;
}

export interface CreateControllerConfig {
  model: string;
  middleware: CreateControllerMiddleware;
  path?: string;
  nestedControllers?: CreateControllerResult[];
}

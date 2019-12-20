import { NextFunction, Request, Response } from "express";

type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

interface CreateControllerMiddleware {
  create: MiddlewareFunction[];
  getOne: MiddlewareFunction[];
  getAll: MiddlewareFunction[];
  update: MiddlewareFunction[];
  destroy: MiddlewareFunction[];
}

export interface CreateControllerConfig {
  model: string;
  path: string;
  middleware: CreateControllerMiddleware;
  nestedControllers: CreateControllerConfig[];
}

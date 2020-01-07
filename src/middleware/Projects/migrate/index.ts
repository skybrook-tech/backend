import runMigrations from "./run-migrations";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    await runMigrations(res);
    next();
  } catch (error) {
    next(error);
  }
};

import db from "../db/models";
import { Request, Response, NextFunction } from "express";

const addDbToContext = (req: Request, res: Response, next: NextFunction) => {
  res.locals.context.db = db;
  next();
};

export default addDbToContext;

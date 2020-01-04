import { Request, Response, NextFunction } from "express";
import db from "../../../db/models";
import handleColumns from "./handle-columns";

const onModelUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handleColumns(req);

    delete req.body.columns;

    next();
  } catch (error) {
    next(error);
  }
};

export default onModelUpdate;

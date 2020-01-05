import { Request, Response, NextFunction } from "express";
import handleColumns from "./handle-columns";

const beforeModelUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handleColumns(req, res);

    delete req.body.columns;

    next();
  } catch (error) {
    next(error);
  }
};

export default beforeModelUpdate;

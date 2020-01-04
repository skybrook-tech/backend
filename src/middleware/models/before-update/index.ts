import { Request, Response, NextFunction } from "express";

const beforeModelUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    delete req.body.columns;

    next();
  } catch (error) {
    next(error);
  }
};

export default beforeModelUpdate;

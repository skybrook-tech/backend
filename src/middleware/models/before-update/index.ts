import { Request, Response, NextFunction } from "express";
import handleColumns from "./handle-columns";
import handleTableName from "./handle-table-name";

const beforeModelUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await handleTableName(req, res);
    await handleColumns(req, res);

    delete req.body.columns;

    next();
  } catch (error) {
    next(error);
  }
};

export default beforeModelUpdate;

import { Request, Response, NextFunction } from "express";
import get from "lodash/get";

const addCreatedUpdatedTimestampColumns = (req: Request, res: Response, next: NextFunction) => {
  try {
    let columns = req.body.columns || [];

    columns = [
      { name: "createdAt", allowNull: false, type: "DATE" },
      { name: "updatedAt", allowNull: false, type: "DATE" },
      ...columns
    ];

    req.body.columns = columns;

    next();
  } catch (error) {
    next(error);
  }
};

export default addCreatedUpdatedTimestampColumns;

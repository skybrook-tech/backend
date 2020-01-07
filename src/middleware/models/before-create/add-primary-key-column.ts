import { Request, Response, NextFunction } from "express";
import get from "lodash/get";

const addPrimaryKeyColumn = (req: Request, res: Response, next: NextFunction) => {
  try {
    let columns = req.body.columns || [];
    const hasPrimaryKey = columns.find((col: any) => get(col, "options.primaryKey"));

    if (!hasPrimaryKey) {
      columns = [
        {
          name: "id",
          type: "INTEGER",
          options: { allowNull: false, autoIncrement: true, primaryKey: true }
        },
        ...columns
      ];
    }

    req.body.columns = columns;

    next();
  } catch (error) {
    next(error);
  }
};

export default addPrimaryKeyColumn;

import { Request, Response, NextFunction } from "express";
import get from "lodash/get";

const filterByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { criteria = {} } = req.body;

    const userId = get(res, "locals.currentUser.id");

    if (userId) {
      req.body.criteria = { ...criteria, userId };
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default filterByUserId;

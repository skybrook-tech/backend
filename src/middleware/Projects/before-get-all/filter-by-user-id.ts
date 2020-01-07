import { Request, Response, NextFunction } from "express";

const filterByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { criteria = {} } = req.body;
    req.body.criteria = { ...criteria, userId: res.locals.currentUser.id };

    next();
  } catch (error) {
    next(error);
  }
};

export default filterByUserId;

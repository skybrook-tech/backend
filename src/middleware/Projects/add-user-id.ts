import { Request, Response, NextFunction } from "express";

const addUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.userId = res.locals.currentUser.id;

    next();
  } catch (error) {
    next(error);
  }
};

export default addUserId;

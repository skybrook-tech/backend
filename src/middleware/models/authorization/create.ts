import { Request, Response, NextFunction } from "express";
import errors from "../../../errors";
import isOwner from "./is-owner";

const canCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ids = { projectId: req.body.projectId, currentUserId: res.locals.currentUser.id };

    if (await isOwner(ids)) {
      return next();
    }

    throw errors.authorization.NOT_AUTHORIZED;
  } catch (error) {
    next(error);
  }
};

export default canCreate;

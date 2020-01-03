import { Request, Response, NextFunction } from "express";
import errors from "../../errors";

const checkAuthorization = (authFunctions: any[]) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationsArray = await Promise.all(authFunctions.map(func => func(req, res)));

    if (authorizationsArray.includes(false)) {
      throw errors.authorization.NOT_AUTHORIZED;
    }

    return next();
  } catch (error) {
    next(error);
  }
};

export default checkAuthorization;

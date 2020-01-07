import { Request, Response, NextFunction } from "express";
import db from "../../../db/models";

const createTenantSchema = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = res.locals.response.data.dataValues;

    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);

    next();
  } catch (error) {
    next(error);
  }
};

export default createTenantSchema;

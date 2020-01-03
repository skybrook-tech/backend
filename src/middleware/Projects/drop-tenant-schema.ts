import { Request, Response, NextFunction } from "express";
import db from "../../db/models";

const dropTenantSchema = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await db.Projects.findOne({ where: { id: req.params.id } });

    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, {
      cascade: true
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default dropTenantSchema;

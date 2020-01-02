import uuid from "uuid/v4";
import animalAdjective from "adjective-adjective-animal";
import { Request, Response, NextFunction } from "express";
import db from "../../db/models";

const generateUUID = () => {
  return new Promise(async (resolve, reject) => {
    let UUIDExists = true;
    let newUUID = null;

    while (UUIDExists) {
      newUUID = await animalAdjective(1);

      newUUID += `-${uuid().split("-")[0]}`;

      const existingProject = await db.Projects.findOne({ where: { uuid: newUUID } });

      if (!existingProject) {
        UUIDExists = false;
      }
    }

    resolve(newUUID);
  });
};

const addUUID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.uuid = await generateUUID();
    req.body.userId = res.locals.currentUser.id;

    next();
  } catch (error) {
    next(error);
  }
};

export default addUUID;

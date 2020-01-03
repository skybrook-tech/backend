import db from "../../db/models";
import { Request, Response } from "express";
import get from "lodash/get";

const isProjectOwner = async (req: Request, res: Response) => {
  const projectId = get(res, "locals.context.pathIds.projectId", req.params.id);
  const currentUserId = res.locals.currentUser.id;

  const modelProject = await db.Projects.findOne({ where: { id: projectId } });

  return modelProject.userId === currentUserId;
};

export default isProjectOwner;

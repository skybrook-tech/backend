import db from "../../db/models";
import { Request, Response } from "express";

const isProjectOwner = async (req: Request, res: Response) => {
  const projectId = res.locals.context.pathIds.projectId;
  const currentUserId = res.locals.currentUser.id;

  const modelProject = await db.Projects.findOne({ where: { id: projectId } });

  return modelProject.userId === currentUserId;
};

export default isProjectOwner;

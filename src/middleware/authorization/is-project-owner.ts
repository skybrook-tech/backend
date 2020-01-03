import db from "../../db/models";
import { Request, Response } from "express";
import get from "lodash/get";

const isProjectOwner = async (req: Request, res: Response) => {
  const projectId = get(res, "locals.context.pathIds.projectId") || get(req, "params.id");
  const currentUserId = get(res, "locals.currentUser.id", NaN);

  const modelProject = await db.Projects.findOne({ where: { id: projectId } });

  return modelProject.userId === currentUserId;
};

export default isProjectOwner;

import db from "../../../db/models";

const isOwner = async (ids: { projectId: number; currentUserId: number }) => {
  const { projectId, currentUserId } = ids;

  const modelProject = await db.Projects.findOne({ where: { id: projectId } });

  return modelProject.userId === currentUserId;
};

export default isOwner;

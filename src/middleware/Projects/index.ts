import addUUID from "./add-uuid";
import addUserId from "./add-user-id";
import createTenantSchema from "./create-tenant-schema";
import dropTenantSchema from "./drop-tenant-schema";
import filterByUserId from "./filter-by-user-id";

const projectsMiddleware = {
  addUUID,
  addUserId,
  createTenantSchema,
  dropTenantSchema,
  filterByUserId
};

export default projectsMiddleware;

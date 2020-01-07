import addUUID from "./add-uuid";
import addUserId from "./add-user-id";
import createTenantSchema from "./create-tenant-schema";
import dropTenantSchema from "./drop-tenant-schema";
import filterByUserId from "./filter-by-user-id";
import migrate from "./migrate";

const projectsMiddleware = {
  addUUID,
  addUserId,
  createTenantSchema,
  dropTenantSchema,
  filterByUserId,
  migrate
};

export default projectsMiddleware;

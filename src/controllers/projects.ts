"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";
import Models from "./models";
import auth from "../middleware/authorization";
import checkAuthorization from "../middleware/authorization/check-authorization";

const ProjectsCrud = middleware.createCrudMiddleware(db.Projects);

const authFuncs = {
  getOne: [auth.isProjectOwner],
  getAll: [],
  update: [auth.isProjectOwner],
  destroy: [auth.isProjectOwner],
  migrate: [auth.isProjectOwner]
} as { getOne: any[]; getAll: any[]; update: any[]; destroy: any[]; migrate: any[] };

export default createController({
  Model: db.Projects,
  middleware: {
    create: [
      middleware.projects.addUUID,
      middleware.projects.addUserId,
      ProjectsCrud.create,
      middleware.projects.createTenantSchema
    ],
    getOne: [checkAuthorization(authFuncs.getOne), ProjectsCrud.findOne],
    getAll: [
      checkAuthorization(authFuncs.getAll),
      middleware.projects.filterByUserId,
      ProjectsCrud.findAll
    ],
    update: [checkAuthorization(authFuncs.update), ProjectsCrud.update],
    destroy: [
      checkAuthorization(authFuncs.destroy),
      middleware.projects.dropTenantSchema,
      ProjectsCrud.destroy
    ]
  },
  customRoutes: [
    {
      method: "post",
      endpoint: "/:id/migrate",
      middleware: [checkAuthorization(authFuncs.migrate), middleware.projects.migrate]
    }
  ],
  nestedControllers: [Models]
});

"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";
import Models from "./models";
import authorization from "../middleware/authorization";
import checkAuthorization from "../middleware/authorization/check-authorization";

const ProjectsCrud = middleware.createCrudMiddleware(db.Projects);
const sharedAuthorizations = checkAuthorization(authorization.isProjectOwner);

export default createController({
  model: "Projects",
  middleware: {
    create: [middleware.projects.addUUID, middleware.projects.addUserId, ProjectsCrud.create],
    getOne: [sharedAuthorizations, ProjectsCrud.findOne],
    getAll: [sharedAuthorizations, ProjectsCrud.findAll],
    update: [sharedAuthorizations, ProjectsCrud.update],
    destroy: [sharedAuthorizations, ProjectsCrud.destroy]
  },
  nestedControllers: [Models]
});

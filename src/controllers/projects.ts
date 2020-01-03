"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";
import Models from "./models";

const ProjectsCrud = middleware.createCrudMiddleware(db.Projects);

export default createController({
  model: "Projects",
  middleware: {
    create: [middleware.projects.addUUID, middleware.projects.addUserId, ProjectsCrud.create],
    getOne: [ProjectsCrud.findOne],
    getAll: [ProjectsCrud.findAll],
    update: [ProjectsCrud.update],
    destroy: [ProjectsCrud.destroy]
  },
  nestedControllers: [Models]
});

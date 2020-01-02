"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";

const ProjectsCrud = middleware.createCrudMiddleware(db.Projects);

export default createController({
  model: "Projects",
  middleware: {
    create: [ProjectsCrud.create],
    getOne: [ProjectsCrud.findOne],
    getAll: [ProjectsCrud.findAll],
    update: [ProjectsCrud.update],
    destroy: [ProjectsCrud.destroy]
  },
  nestedControllers: []
});

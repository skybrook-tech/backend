"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";

const ModelsCrud = middleware.createCrudMiddleware(db.Models);

export default createController({
  model: "Models",
  middleware: {
    create: [ModelsCrud.create],
    getOne: [ModelsCrud.findOne],
    getAll: [ModelsCrud.findAll],
    update: [ModelsCrud.update],
    destroy: [ModelsCrud.destroy]
  },
  nestedControllers: []
});

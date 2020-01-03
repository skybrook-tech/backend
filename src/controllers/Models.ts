"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";
import authorization from "../middleware/authorization";
import checkAuthorization from "../middleware/authorization/check-authorization";

const ModelsCrud = middleware.createCrudMiddleware(db.Models);
const sharedAuthorizations = checkAuthorization(authorization.isProjectOwner);

export default createController({
  model: "Models",
  middleware: {
    create: [sharedAuthorizations, ModelsCrud.create],
    getOne: [sharedAuthorizations, ModelsCrud.findOne],
    getAll: [sharedAuthorizations, ModelsCrud.findAll],
    update: [sharedAuthorizations, ModelsCrud.update],
    destroy: [sharedAuthorizations, ModelsCrud.destroy]
  },
  nestedControllers: []
});

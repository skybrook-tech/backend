"use strict";
import createController from "../core/utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";
import auth from "../middleware/authorization";
import checkAuthorization from "../middleware/authorization/check-authorization";
import Columns from "./columns";

const ModelsCrud = middleware.core.createCrudMiddleware(db.Models);

const authFuncs = {
  create: [auth.isProjectOwner],
  getOne: [auth.isProjectOwner],
  getAll: [auth.isProjectOwner],
  update: [auth.isProjectOwner],
  destroy: [auth.isProjectOwner]
} as { create: any[]; getOne: any[]; getAll: any[]; update: any[]; destroy: any[] };

export default createController({
  Model: db.Models,
  middleware: {
    create: [
      checkAuthorization(authFuncs.create),
      middleware.models.beforeCreate,
      ModelsCrud.create,
      middleware.models.afterCreate
    ],
    getOne: [checkAuthorization(authFuncs.getOne), ModelsCrud.findOne],
    getAll: [checkAuthorization(authFuncs.getAll), ModelsCrud.findAll],
    update: [
      checkAuthorization(authFuncs.update),
      middleware.models.beforeUpdate,
      ModelsCrud.update
    ],
    destroy: [
      checkAuthorization(authFuncs.destroy),
      middleware.models.beforeDestroy,
      ModelsCrud.destroy
    ]
  },
  nestedControllers: [Columns]
});

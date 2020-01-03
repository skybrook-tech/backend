"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";
import auth from "../middleware/authorization";
import checkAuthorization from "../middleware/authorization/check-authorization";
import Columns from "./columns";

const ModelsCrud = middleware.createCrudMiddleware(db.Models);

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
      ModelsCrud.create,
      middleware.models.generateCreateTableMigration
    ],
    getOne: [checkAuthorization(authFuncs.getOne), ModelsCrud.findOne],
    getAll: [checkAuthorization(authFuncs.getAll), ModelsCrud.findAll],
    update: [checkAuthorization(authFuncs.update), ModelsCrud.update],
    destroy: [
      checkAuthorization(authFuncs.destroy),
      middleware.models.generateDropTableMigration,
      ModelsCrud.destroy
    ]
  },
  nestedControllers: [Columns]
});

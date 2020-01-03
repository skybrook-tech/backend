"use strict";
import createController from "../utils/create-controller";
import middleware from "../middleware";
import db from "../db/models";
import auth from "../middleware/authorization";

import checkAuthorization from "../middleware/authorization/check-authorization";

const ColumnsCrud = middleware.createCrudMiddleware(db.Columns);

const authFuncs = {
  create: [auth.isProjectOwner],
  getOne: [auth.isProjectOwner],
  getAll: [auth.isProjectOwner],
  update: [auth.isProjectOwner],
  destroy: [auth.isProjectOwner]
} as { create: any[]; getOne: any[]; getAll: any[]; update: any[]; destroy: any[] };

export default createController({
  model: "Columns",
  middleware: {
    create: [checkAuthorization(authFuncs.create), ColumnsCrud.create],
    getOne: [checkAuthorization(authFuncs.getOne), ColumnsCrud.findOne],
    getAll: [checkAuthorization(authFuncs.getAll), ColumnsCrud.findAll],
    update: [checkAuthorization(authFuncs.update), ColumnsCrud.update],
    destroy: [checkAuthorization(authFuncs.destroy), ColumnsCrud.destroy]
  },
  nestedControllers: []
});

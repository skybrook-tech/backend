"use strict";
import createController from "../utils/create-controller";

export default createController({
  model: "projects",
  middleware: {
    getOne: [],
    getAll: [],
    create: [],
    destroy: [],
    update: []
  },
  nestedControllers: []
});

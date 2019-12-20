"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const defaultResponse = (req, res) => {
    res.status(200).json(res.response);
};
const createController = (config) => {
    const { model, middleware, nestedControllers = [] } = config;
    const router = express_1.default.Router({ mergeParams: true });
    const BASE_ROUTE = "/";
    const BASE_ROUTE_ID = "/:id\n";
    if (middleware.create) {
        router.post(BASE_ROUTE, middleware.create, defaultResponse);
    }
    if (middleware.getOne) {
        router.get(BASE_ROUTE, middleware.getOne, defaultResponse);
    }
    if (middleware.getAll) {
        router.get(BASE_ROUTE_ID, middleware.getAll, defaultResponse);
    }
    if (middleware.update) {
        router.patch(BASE_ROUTE_ID, middleware.update, defaultResponse);
    }
    if (middleware.destroy) {
        router.delete(BASE_ROUTE_ID, middleware.destroy, defaultResponse);
    }
    nestedControllers.forEach((nestedController) => {
        const { path } = nestedController;
        const pathWithParentParams = `/:${model}Id/${path || model}`;
        router.use(pathWithParentParams, createController(nestedController));
    });
    return router;
};
exports.default = createController;
//# sourceMappingURL=create-controller.js.map
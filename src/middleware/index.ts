import authentication from "./authentication";
import createCrudMiddleware from "./crud-generator";
import defaults from "./defaults/response";
import errorHandler from "./error-handler";
import users from "./users";
import projects from "./projects";

interface MiddlewareObject {
  authentication: any;
  createCrudMiddleware: any;
  defaults: any;
  errorHandler: any;
  projects: any;
  users: any;
}

const middleware = {
  authentication,
  createCrudMiddleware,
  defaults,
  errorHandler,
  projects,
  users
} as MiddlewareObject;

export default middleware;

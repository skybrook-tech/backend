import authentication from "./authentication";
import createCrudMiddleware from "./crud-generator";
import defaults from "./defaults/response";
import errorHandler from "./error-handler";
import users from "./users";
import Projects from "./Projects";

interface MiddlewareObject {
  authentication: any;
  createCrudMiddleware: any;
  defaults: any;
  errorHandler: any;
  Projects: any;
  users: any;
}

const middleware = {
  authentication,
  createCrudMiddleware,
  defaults,
  errorHandler,
  Projects,
  users
} as MiddlewareObject;

export default middleware;

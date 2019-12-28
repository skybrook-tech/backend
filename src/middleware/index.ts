import authentication from "./authentication";
import defaults from "./defaults/response";
import errorHandler from "./error-handler";
import users from "./users";

interface MiddlewareObject {
  authentication: any;
  defaults: any;
  errorHandler: any;
  users: any;
}

const middleware = { authentication, defaults, errorHandler, users } as MiddlewareObject;

export default middleware;

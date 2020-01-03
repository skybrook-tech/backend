import checkAuthorization from "./check-authorization";
import isProjectOwner from "./is-project-owner";

const authorizationMiddleware = {
  checkAuthorization,
  isProjectOwner
};

export default authorizationMiddleware;

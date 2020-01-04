import afterCreate from "./after-create";
import beforeDestroy from "./before-destroy";
import beforeUpdate from "./before-update";

interface ModelsMiddleware {
  afterCreate: any;
  beforeDestroy: any;
  beforeUpdate: any;
}

const modelsMiddleware = {
  afterCreate,
  beforeDestroy,
  beforeUpdate
} as ModelsMiddleware;

export default modelsMiddleware;

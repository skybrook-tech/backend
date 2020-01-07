import afterCreate from "./after-create";
import beforeCreate from "./before-create";
import beforeDestroy from "./before-destroy";
import beforeUpdate from "./before-update";

interface ModelsMiddleware {
  afterCreate: any;
  beforeCreate: any;
  beforeDestroy: any;
  beforeUpdate: any;
}

const modelsMiddleware = {
  afterCreate,
  beforeCreate,
  beforeDestroy,
  beforeUpdate
} as ModelsMiddleware;

export default modelsMiddleware;

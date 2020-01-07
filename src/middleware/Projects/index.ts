import beforeCreate from "./before-create";
import afterCreate from "./after-create";
import beforeDestroy from "./before-destroy";
import beforeGetAll from "./before-get-all";
import migrate from "./migrate";

const projectsMiddleware = {
  beforeCreate,
  afterCreate,
  beforeDestroy,
  beforeGetAll,
  migrate
};

export default projectsMiddleware;

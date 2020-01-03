import createRecord from "../middleware/crud-generator/create-record";
import db from "../db/models";
import faker from "faker";
import createProject from "./project";

const createModel = async (options?: any) => {
  const { props = {} } = options || {};

  const locals = { sequelizeParams: {} };

  // ts-ignore
  const projectId = props.projectId || (await createProject()).id;

  const body = {
    name: faker.random.word(),
    projectId,
    relations: [],
    ...props
  };

  return createRecord({ Model: db.Users, locals, body });
};

export default createModel;

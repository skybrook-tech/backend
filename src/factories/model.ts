import createRecord from "../middleware/crud-generator/create-record";
import db from "../db/models";
import faker from "faker";
import createProject from "./project";

const createModel = async (options?: any) => {
  const { props = {} } = options || {};

  // @ts-ignore
  const locals = { sequelizeParams: { include: db.Models.getIncluded(db) } };

  const projectId = props.projectId || (await createProject()).id;

  const body = {
    name: faker.random.word(),
    projectId,
    relations: [],
    ...props
  };

  return createRecord({ Model: db.Models, locals, body });
};

export default createModel;

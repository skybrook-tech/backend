import createRecord from "../core/middleware/crud-generator/create-record";
import db from "../db/models";
import faker from "faker";
import { generateUUID } from "../middleware/projects/before-create/add-uuid";
import createUser from "./user";

const createProject = async (options?: any) => {
  const { props = {} } = options || {};

  const locals = { sequelizeParams: {} };

  const uuid = await generateUUID();

  // @ts-ignore
  const userId = props.userId || (await createUser()).id;

  const body = {
    name: faker.random.word(),
    urlAffix: "",
    uuid,
    userId,
    ...props
  };

  return createRecord({ Model: db.Projects, locals, body });
};

export default createProject;

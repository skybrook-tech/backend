import createRecord from "../middleware/crud-generator/create-record";
import db from "../db/models";
import faker from "faker";
import createModel from "./model";

const createColumns = async (options?: any) => {
  const { props = {} } = options || {};

  // @ts-ignore
  const locals = { sequelizeParams: {} };

  const modelId = props.modelId || (await createModel()).id;

  const body = {
    modelId,
    name: faker.random.word(),
    type: faker.random.word(),
    options: {},
    ...props
  };

  return createRecord({ Model: db.Columns, locals, body });
};

export default createColumns;

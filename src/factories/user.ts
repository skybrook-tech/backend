import createRecord from "../middleware/crud-generator/create-record";
import db from "../db/models";
import faker from "faker";

const createUser = async (options?: any) => {
  const { props = {} } = options || {};

  const locals = { sequelizeParams: {} };

  const body = {
    name: faker.random.word(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.random.word(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...props
  };

  return createRecord({ Model: db.Users, locals, body });
};

export default createUser;

import createRecord from "../../crud-generator/create-record";
import findOneRecord from "../../crud-generator/find-one-record";
import db from "../../../db/models";

const createRecordForTest = () => {
  const include = [{ model: db.__testModelRelated__ }];

  const locals = { sequelizeParams: { include } };
  const expectedRelatedValue = "related Value one";

  const body = {
    attr1: "valueOne",
    attr2: 1,
    attr3: true,
    __testModelRelated__s: [{ attr1: expectedRelatedValue }],
    foo: "bar"
  };

  return createRecord({ Model: db.__testModel__, locals, body });
};

afterAll(async () => {
  await db.__testModel__.destroy({ where: {} });
});

describe("crud-generator --- find-one-record -- basic", () => {
  it("returns record with provided id", async () => {
    const expected = await createRecordForTest();

    const params = { id: expected.id };
    const record = await findOneRecord({ Model: db.__testModel__, params });

    expect(record.id).toBe(expected.id);
  });
});

describe("crud-generator --- create-record -- with related and sequelizeParams", () => {
  it("creates a new record and nested models which were included", async () => {
    const include = [{ model: db.__testModelRelated__ }];

    const locals = { sequelizeParams: { include } };

    const expected = await createRecordForTest();

    const params = { id: expected.id };
    const record = await findOneRecord({ Model: db.__testModel__, params, locals });

    expect(record.id).toBe(expected.id);
    expect(record).toHaveProperty("__testModelRelated__s");
    expect(record.__testModelRelated__s[0]).toHaveProperty("id");
  });
});

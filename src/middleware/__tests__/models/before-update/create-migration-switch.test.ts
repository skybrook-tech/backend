import { createMigrationSwitch } from "../../../models/before-update/get-changed-cols-and-migrations";
import migrationTypes from "../../../../constants/migration-types";

interface TestCase {
  description: string;
  expectationString: string;
  prevValue: any;
  nextValue: any;
  expected: string;
}

// TODO: fix/improve this test to cover migrations being returned as an array
const testCases = [
  {
    description: "when a column's name has changed",
    expectationString: "returns an renameColumn migration",
    prevValue: { id: 1, name: "oldName", type: "TYPE", options: {} },
    nextValue: { id: 1, name: "newName", type: "TYPE", options: {} },
    expected: migrationTypes.RENAME_COLUMN
  },
  {
    description: "when column doesn't exist yet",
    expectationString: "returns an addColumn migration",
    prevValue: null,
    nextValue: { name: "newName", type: "TYPE", options: {} },
    expected: migrationTypes.ADD_COLUMN
  },
  {
    description: "when column is flagged for deletion",
    expectationString: "returns a removeColumn migration",
    prevValue: { id: 1, name: "name", type: "TYPE", options: {} },
    nextValue: { id: 1, name: "name", type: "TYPE", options: {}, _delete: true },
    expected: migrationTypes.REMOVE_COLUMN
  },
  {
    description: "when anything aside from name has changed",
    expectationString: "returns a changeColumn migration",
    prevValue: { id: 1, name: "name", type: "INTEGER", options: {} },
    nextValue: { id: 1, name: "name", type: "STRING", options: {} },
    expected: migrationTypes.CHANGE_COLUMN
  }
] as TestCase[];

describe("middleware/models/before-update/createMigrationSwitch --- ", () => {
  const project = { id: 1, uuid: "fake-uuid" };
  const model = { id: 2, name: "fake-name" };

  testCases.forEach(testCase => {
    const { prevValue, nextValue } = testCase;
    describe(testCase.description, () => {
      it(testCase.expectationString, async () => {
        const actual = createMigrationSwitch({ project, model, prevValue, nextValue });

        expect(actual[0].type).toBe(testCase.expected);
      });
    });
  });
});

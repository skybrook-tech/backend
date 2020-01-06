import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import addColumnMigrator from "../../../../projects/migrate/migrators/add-column";
import changeColumnMigrator from "../../../../projects/migrate/migrators/change-column";
import createProject from "../../../../../factories/project";
import createModel from "../../../../../factories/model";
import createColumn from "../../../../../factories/column";
import db from "../../../../../db/models";
import migrationTemplates from "../../../../models/migration-templates";

describe("middleware/projects/migrate/migrators/addColumn", () => {
  let project: any;
  let model: any;
  let column: any;
  let createTableMigration: any;
  let addColumnMigration: any;
  let changeColumnMigration: any;
  const prevType = "STRING";
  const nextType = "INTEGER";

  beforeAll(async () => {
    project = await createProject();
    model = await createModel();
    column = await createColumn({ props: { modelId: model.id, type: prevType, name: "before" } });

    createTableMigration = await db.Migrations.create(
      migrationTemplates.createTable({ project, model })
    );
    addColumnMigration = await db.Migrations.create(
      migrationTemplates.addColumn({
        project,
        model,
        prevValue: null,
        nextValue: column.dataValues
      })
    );
    changeColumnMigration = await db.Migrations.create(
      migrationTemplates.changeColumn({
        project,
        model,
        prevValue: column.dataValues,
        nextValue: { ...column.dataValues, type: nextType }
      })
    );

    // @ts-ignore
    await db.sequelize.queryInterface.createSchema(`"${project.uuid}"`);
    await createTableMigrator.up(createTableMigration);
    await addColumnMigrator.up(addColumnMigration);
  });

  afterAll(async () => {
    // @ts-ignore
    await db.sequelize.queryInterface.dropSchema(`"${project.uuid}"`, { cascade: true });
    await db.Projects.destroy({ where: {} });
    await db.Users.destroy({ where: {} });
  });

  describe("when run agains database", () => {
    it("changes a column type and updates migration to isMigrated: true", async () => {
      const getColumnsQuery = `
      SELECT *
      FROM information_schema.columns
      WHERE table_schema = '${project.uuid}'
      AND table_name   = '${model.name}'
      AND column_name   = '${column.name}';`;

      const [actualColumn] = await db.sequelize.query(getColumnsQuery);

      // @ts-ignore
      expect(actualColumn[0].data_type).toBe("character varying");

      await changeColumnMigrator.up(changeColumnMigration);
      const updatedMigration = await db.Migrations.findByPk(changeColumnMigration.id);
      const [actualColumnAfterMigration] = await db.sequelize.query(getColumnsQuery);

      // @ts-ignore
      expect(actualColumnAfterMigration[0].data_type).toBe("integer");

      expect(updatedMigration.isMigrated).toBe(true);
    });
  });
});

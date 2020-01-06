import createTableMigrator from "../../../../projects/migrate/migrators/create-table";
import addColumnMigrator from "../../../../projects/migrate/migrators/add-column";
import renameColumnMigrator from "../../../../projects/migrate/migrators/rename-column";
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
  let renameColumnMigration: any;
  const nextName = "after";

  beforeAll(async () => {
    project = await createProject();
    model = await createModel();
    column = await createColumn({ props: { modelId: model.id, type: "STRING", name: "before" } });

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
    renameColumnMigration = await db.Migrations.create(
      migrationTemplates.renameColumn({
        project,
        model,
        prevValue: column.dataValues,
        nextValue: { ...column.dataValues, name: nextName }
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
    it("renames column on table and updates migration to isMigrated: true", async () => {
      const getColumnsQuery = `
      SELECT *
      FROM information_schema.columns
      WHERE table_schema = '${project.uuid}'
      AND table_name   = '${model.name}';`;

      const [tableColumns] = await db.sequelize.query(getColumnsQuery);

      const prevNameExists = tableColumns.find((col: any) => col.column_name === column.name);
      const nextNameExists = tableColumns.find((col: any) => col.column_name === nextName);

      expect(prevNameExists).toBeTruthy();
      expect(nextNameExists).toBeFalsy();

      await renameColumnMigrator.up(renameColumnMigration);
      const updatedMigration = await db.Migrations.findByPk(addColumnMigration.id);
      const [tableColumnsAfterMigration] = await db.sequelize.query(getColumnsQuery);

      const prevNameAfterMigration = tableColumnsAfterMigration.find(
        (col: any) => col.column_name === column.name
      );
      const nextNameAfterMigration = tableColumnsAfterMigration.find(
        (col: any) => col.column_name === nextName
      );

      expect(prevNameAfterMigration).toBeFalsy();
      expect(nextNameAfterMigration).toBeTruthy();

      // @ts-ignore
      expect(nextNameAfterMigration.data_type).toBe("character varying");
      expect(updatedMigration.isMigrated).toBe(true);
    });
  });
});

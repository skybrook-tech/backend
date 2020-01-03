import { Sequelize } from "sequelize";
import { ColumnsModelStatic } from "./Columns/types";
import { MigrationsModelStatic } from "./Migrations/types";
import { ModelsModelStatic } from "./Models/types";
import { ProjectsModelStatic } from "./Projects/types";
import { UsersModelStatic } from "./Users/types";
import { __testModelRelated__ModelStatic } from "./__testModelRelated__/types";
import { __testModel__ModelStatic } from "./__testModel__/types";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
  Columns: ColumnsModelStatic;
  Migrations: MigrationsModelStatic;
  Models: ModelsModelStatic;
  Projects: ProjectsModelStatic;
  Users: UsersModelStatic;
  __testModelRelated__: __testModelRelated__ModelStatic;
  __testModel__: __testModel__ModelStatic;
}

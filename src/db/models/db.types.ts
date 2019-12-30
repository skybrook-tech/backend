import { Sequelize } from "sequelize";
import { __testModel__ModelStatic } from "./__testModel__/types";
import { __testModelRelated__ModelStatic } from "./__testModelRelated__/types";
import { ProjectsModelStatic } from "./Projects/types";
import { UsersModelStatic } from "./Users/types";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
  __testModel__: __testModel__ModelStatic;
  __testModelRelated__: __testModelRelated__ModelStatic;
  Projects: ProjectsModelStatic;
  Users: UsersModelStatic;
}

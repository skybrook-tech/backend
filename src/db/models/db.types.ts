import { Sequelize } from "sequelize";
import { ProjectsModelStatic } from "./projects/types";
import { UsersModelStatic } from "./users/types";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
  Projects: ProjectsModelStatic;
  Users: UsersModelStatic;
}

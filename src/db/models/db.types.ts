import { Sequelize } from "sequelize";
import { UsersModelStatic } from "./users/types";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
  Users: UsersModelStatic;
}

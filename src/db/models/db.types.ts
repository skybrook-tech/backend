import { Sequelize } from "sequelize";

export interface Db {
  sequelize: Sequelize;
  Sequelize: any;
}

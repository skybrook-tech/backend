import { BuildOptions, Model } from "sequelize";

export interface MigrationsModel extends Model {
  readonly id: number;
  readonly dataValues: any;
  projectId: number;
  name: string;
  type: string;
  timeStamp: string;
  isMigrated: boolean;
  up: any;
  down: any;
  createdAt: Date;
  updatedAt: Date;
}

export type MigrationsModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => MigrationsModel);

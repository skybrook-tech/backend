import { BuildOptions, Model } from "sequelize";

export interface ModelsModel extends Model {
  readonly id: number;
  projectId: number;
  name: string;
  relations: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ModelsModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => ModelsModel);

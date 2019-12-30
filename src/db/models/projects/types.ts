import { BuildOptions, Model } from "sequelize";

export interface ProjectsModel extends Model {
  readonly id: number;
  name: string;
  urlAffix: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectsModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => ProjectsModel);

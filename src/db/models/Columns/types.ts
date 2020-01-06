import { BuildOptions, Model } from "sequelize";

export interface ColumnsModel extends Model {
  readonly id: number;
  readonly dataValues: any;
  name: string;
  type: string;
  options: string;
  modelId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ColumnsModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => ColumnsModel);

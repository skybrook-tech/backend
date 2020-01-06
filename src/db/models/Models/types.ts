import { ColumnsModelStatic } from "../Columns/types";
import { BuildOptions, Model } from "sequelize";

export interface ModelsModel extends Model {
  readonly id: number;
  readonly dataValues: any;
  projectId: number;
  name: string;
  relations: string;
  columns: ColumnsModelStatic[];
  createdAt: Date;
  updatedAt: Date;
}

export type ModelsModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => ModelsModel);

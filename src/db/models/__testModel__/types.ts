import { BuildOptions, Model } from "sequelize";

export interface __testModel__Model extends Model {
  readonly id: number;
  attr1: string;
  attr2: number;
  attr3: boolean;
  __testModelRelated__s: any[];
  createdAt: Date;
  updatedAt: Date;
}

export type __testModel__ModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => __testModel__Model);

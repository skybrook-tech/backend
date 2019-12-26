import { BuildOptions, Model } from "sequelize";

export interface UsersModel extends Model {
  readonly id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UsersModelStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => UsersModel);

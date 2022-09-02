import { User } from "./db/entity/User";
import { Repository } from "typeorm";

export interface IUser extends Repository {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface IDeleteResponse {
  delete: true;
}

export interface ISignTokeResponse {
  user: IUser;
  token: string;
}

export interface IUserLoginSchema {
  email: string;
  password: string;
}

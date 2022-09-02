import { User } from "./db/entity/User";
import { Repository } from "typeorm";

export interface IUser extends Repository {
  id: string;
  firstName: string;
  lastName: string;
  jwt: string;
  password: string;
  email: string;
}

export interface IDeleteResponse {
  delete: true;
}

export interface ISignTokeResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUserLoginSchema {
  email: string;
  password: string;
}

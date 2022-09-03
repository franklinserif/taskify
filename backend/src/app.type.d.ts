import { User } from "./db/entity/User";
import { Repository } from "typeorm";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  password: string;
  email: string;
}

export interface IAuth {
  access_token: string;
  confirm_code: number;
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

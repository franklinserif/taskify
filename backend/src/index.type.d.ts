import { User } from "./db/entity/User";
import { Repository } from "typeorm";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  confirmCode: number;
  refreshToken: string;
  password: string;
  email: string;
}

export interface IConfirmCode {
  confirmCode: number;
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

export interface IUser {
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

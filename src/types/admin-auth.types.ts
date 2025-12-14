import { IAdminUser } from "./admin-user.types";

export interface IAuthAdminForm {
  name?: string;
  email: string;
  password: string;
}

export interface IAdminTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthAdminResponse extends IAdminTokens {
  user: IAdminUser;
}

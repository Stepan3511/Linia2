export enum UserAdminRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: UserAdminRole;
}

export interface IAdminUserEditInput
  extends Pick<IAdminUser, "name" | "email" | "role"> {}

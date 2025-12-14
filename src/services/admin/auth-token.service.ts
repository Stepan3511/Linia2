import Cookies from "js-cookie";

import { IAuthAdminResponse, IAdminTokens } from "../../types/admin-auth.types";

export enum EnumTokens {
  "ACCESS_TOKEN_ADMIN" = "accessTokenAdmin",
  "REFRESH_TOKEN_ADMIN" = "refreshTokenAdmin",
}

export enum EnumStorage {
  "USER" = "user",
}

export const getAccessToken = () => {
  const accessTokenClient = Cookies.get(EnumTokens.ACCESS_TOKEN_ADMIN);
  return accessTokenClient || null;
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const saveTokensStorage = (data: IAdminTokens) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN_ADMIN, data.accessToken);
  Cookies.set(EnumTokens.REFRESH_TOKEN_ADMIN, data.refreshToken);
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN_ADMIN);
  Cookies.remove(EnumTokens.REFRESH_TOKEN_ADMIN);
};

export const saveToStorage = (data: IAuthAdminResponse) => {
  saveTokensStorage(data);
  localStorage.setItem("user", JSON.stringify(data.user));
};

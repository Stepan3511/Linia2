import Cookies from "js-cookie";

export const ACCESS_TOKEN_CLIENT = "accessTokenClient";
export const REFRESH_TOKEN_CLIENT = "refreshTokenClient";

export const getAccessTokenClient = () =>
  Cookies.get(ACCESS_TOKEN_CLIENT) || null;

export const getRefreshTokenClient = () =>
  Cookies.get(REFRESH_TOKEN_CLIENT) || null;

export const saveClientTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN_CLIENT, accessToken, { expires: 1 / 24 });
  Cookies.set(REFRESH_TOKEN_CLIENT, refreshToken, { expires: 7 });
};

export const removeClientTokens = () => {
  Cookies.remove(ACCESS_TOKEN_CLIENT);
  Cookies.remove(REFRESH_TOKEN_CLIENT);
};

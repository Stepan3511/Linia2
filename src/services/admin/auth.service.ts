import Cookies from "js-cookie";

import { axiosClassic } from "@/api/interceptors";

import { API_URL } from "@/config/api.config";

import { IAuthAdminForm, IAuthAdminResponse } from "@/types/admin-auth.types";

import { EnumTokens, saveToStorage } from "./auth-token.service";

class AuthService {
  async main(type: "login" | "register", data: IAuthAdminForm) {
    const response = await axiosClassic.post<IAuthAdminResponse>(
      API_URL.admin(`/${type}`),
      data
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  }

  async getNewTokens() {
    const refreshTokenClient = Cookies.get(EnumTokens.REFRESH_TOKEN_ADMIN);

    const response = await axiosClassic.post<
      string,
      { data: IAuthAdminResponse }
    >(API_URL.admin(`/login/access-token`), { refreshTokenClient });

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  }
}

export const authService = new AuthService();

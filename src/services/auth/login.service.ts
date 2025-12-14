import { ILogin } from "@/types/login.types";
import { axiosWithAuthClient } from "@/api/interceptors-client";
import {
  getRefreshTokenClient,
  saveClientTokens,
  removeClientTokens,
} from "@/services/auth/token-client.service";
import { API_URL } from "@/config/api.config";

class LoginService {
  async otpSendPassword(login: ILogin) {
    const response = await axiosWithAuthClient.post<{
      accessToken: string;
      refreshToken: string;
    }>(API_URL.clientAuth(`/login`), login);

    if (response.data.accessToken && response.data.refreshToken) {
      saveClientTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response;
  }

  async getNewTokens() {
    const refreshToken = getRefreshTokenClient();

    if (!refreshToken) {
      throw new Error("Нет refreshToken");
    }

    try {
      const response = await axiosWithAuthClient.post<{
        accessToken: string;
        refreshToken: string;
      }>(API_URL.clientAuth(`/refresh-tokens`), { refreshToken });

      if (response.data.accessToken && response.data.refreshToken) {
        saveClientTokens(response.data.accessToken, response.data.refreshToken);
      }

      return response;
    } catch (error) {
      removeClientTokens();
      throw new Error("Ошибка при обновлении токенов");
    }
  }
}

export const loginService = new LoginService();

import { axiosWithAuthClient } from "@/api/interceptors-client";
import { API_URL } from "@/config/api.config";
import {
  getRefreshTokenClient,
  removeClientTokens,
} from "@/services/auth/token-client.service";

class LogoutService {
  async logout() {
    const refreshToken = getRefreshTokenClient();

    if (!refreshToken) {
      throw new Error("Refresh токен отсутствует");
    }

    await axiosWithAuthClient.post(API_URL.clientAuth(`/logout`), {
      refreshToken,
    });

    removeClientTokens();
  }
}

export const logoutService = new LogoutService();

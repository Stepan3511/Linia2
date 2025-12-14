import { axiosWithAuthClient } from "@/api/interceptors-client";
import {
  getAccessTokenClient,
  saveClientTokens,
} from "@/services/auth/token-client.service";
import { loginService } from "./login.service";
import { API_URL } from "@/config/api.config";

class UserService {
  async getUserProfile() {
    let accessToken = getAccessTokenClient();

    if (!accessToken) {
      try {
        const refreshResponse = await loginService.getNewTokens();
        accessToken = refreshResponse.data.accessToken;
      } catch (refreshError) {
        throw new Error("Не удалось обновить токен");
      }
    }

    try {
      const response = await axiosWithAuthClient.get<{ email: string }>(
        API_URL.clientUser(`/profile`),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        try {
          const refreshResponse = await loginService.getNewTokens();
          accessToken = refreshResponse.data.accessToken;

          const retryResponse = await axiosWithAuthClient.get<{
            email: string;
          }>(API_URL.clientUser(`/profile`), {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          return retryResponse.data;
        } catch {
          throw new Error("Не удалось обновить токен повторно");
        }
      }

      throw error;
    }
  }
}

export const userService = new UserService();

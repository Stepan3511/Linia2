import { axiosWithAuth } from "@/api/interceptors";

import { API_URL } from "@/config/api.config";

import { IAdminUser } from "@/types/admin-user.types";

class UserService {
  async getProfile() {
    const response = await axiosWithAuth.get<IAdminUser>(
      API_URL.users("/profile")
    );
    return response;
  }

  async getProfileMiddleware(refreshToken: string) {
    const { data: profile } = await axiosWithAuth.get<IAdminUser>(
      API_URL.users("/profile"),
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    return profile;
  }
}

export const userService = new UserService();

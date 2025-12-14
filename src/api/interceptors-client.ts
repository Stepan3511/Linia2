import axios, { type CreateAxiosDefaults } from "axios";
import { SERVER_URL } from "@/config/api.config";

import {
  getAccessTokenClient,
  removeClientTokens,
} from "@/services/auth/token-client.service";
import { loginService } from "@/services/auth/login.service";

import { errorCatch } from "./error";

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosClassicClient = axios.create(options);
const axiosWithAuthClient = axios.create(options);

axiosWithAuthClient.interceptors.request.use((config) => {
  const accessToken = getAccessTokenClient();

  if (config && config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

axiosWithAuthClient.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await loginService.getNewTokens();
        return axiosWithAuthClient.request(originalRequest);
      } catch (refreshError) {
        removeClientTokens();
      }
    }

    throw error;
  }
);

export { axiosClassicClient, axiosWithAuthClient };

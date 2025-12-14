import { axiosWithAuthClient } from "@/api/interceptors-client";
import { API_URL } from "@/config/api.config";
import { IOtp } from "@/types/otp.types";

class OtpService {
  async otpSendPassword(email: IOtp) {
    return axiosWithAuthClient.post<IOtp>(
      API_URL.clientAuth(`/send-otp`),
      email
    );
  }
}

export const otpService = new OtpService();

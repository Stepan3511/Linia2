import { useMutation } from "@tanstack/react-query";
import { otpService } from "@/services/auth/otp.service";
import { IOtp } from "@/types/otp.types";
import toast from "react-hot-toast";

export const useOtpMutation = () => {
  const { mutate, isPending: isLoadingOtp } = useMutation({
    mutationKey: ["otp"],
    mutationFn: (data: IOtp) => otpService.otpSendPassword(data),
    onError: (error: any) => {
      console.error("Ошибка при отправке OTP:", error);
      toast.error(error.response?.data?.message || "Ошибка при отправке OTP");
    },
  });

  const sendOtp = (data: IOtp, onSuccess?: () => void) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Код отправлен");
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };

  return { sendOtp, isLoadingOtp };
};

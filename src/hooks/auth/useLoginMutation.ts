import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PUBLIC_URL } from "@/config/url.config";
import { ILogin } from "@/types/login.types";
import { loginService } from "@/services/auth/login.service";
import { useAuthModalStore } from "@/store/authModalStore"; // ← добавляем

const ERROR_MESSAGES: Record<string, string> = {
  "Invalid OTP": "Код неверный",
  "Internal server error": "Ошибка сервера",
};

export const useLoginMutation = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const { closeModal } = useAuthModalStore(); // ← используем

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILogin) => loginService.otpSendPassword(data),
    onSuccess: () => {
      toast.success("Вход в аккаунт");

      queryClient.removeQueries({ queryKey: ["userProfile"] }); // сбрасываем кэш
      closeModal(); // ← закрываем модалку
      push(PUBLIC_URL.home());
    },
    onError(error: any) {
      const errorMessage =
        ERROR_MESSAGES[error.response?.data?.message] || "Ошибка при входе";
      toast.error(errorMessage);
    },
  });

  return { login, isLoadingLogin };
};

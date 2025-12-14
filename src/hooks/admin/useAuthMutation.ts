import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";

import { MANAGE_URL } from "@/config/url.config";

import { authService } from "@/services/admin/auth.service";

import { IAuthAdminForm } from "@/types/admin-auth.types";

export const useAuthMutation = (
  isLoginForm: boolean,
  reset: UseFormReset<IAuthAdminForm>
) => {
  const { push, refresh } = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["admin"],
    mutationFn: (data: IAuthAdminForm) =>
      authService.main(isLoginForm ? "login" : "register", data),
    onSuccess() {
      toast.success("Вы успешно вошли в систему");
      reset();
      push(MANAGE_URL.root());
      refresh();
    },
    onError(error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ошибка");
      }
    },
  });

  return { mutate };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logoutService } from "@/services/auth/logout.service";
import { PUBLIC_URL } from "@/config/url.config";
import { useCartStore } from "@/store/cartStore";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const { cart, clearCart } = useCartStore();

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logoutService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["userProfile"] });
      toast.success("Вы вышли из аккаунта");
      clearCart();

      push(PUBLIC_URL.home());
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Ошибка при выходе");
    },
  });

  return { logout, isLoadingLogout };
};

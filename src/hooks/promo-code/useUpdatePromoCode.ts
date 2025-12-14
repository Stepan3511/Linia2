import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { IPromoCodeInput } from "@/types/promo-code.types";
import { promoCodeService } from "@/services/promo-code.service";
import toast from "react-hot-toast";

export const useUpdatePromoCode = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (promoCode: IPromoCodeInput) =>
      promoCodeService.update(id, promoCode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get promo codes"],
      });
      push(MANAGE_URL.promoCode());
      toast.success("Промокод обновлен");
    },
    onError() {
      toast.error("Ошибка при обновлении");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IPromoCodeInput } from "@/types/promo-code.types";
import { promoCodeService } from "@/services/promo-code.service";
import { MANAGE_URL } from "@/config/url.config";
import toast from "react-hot-toast";

export const useCreatePromoCode = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (promoCode: IPromoCodeInput) =>
      promoCodeService.create(promoCode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get promo codes"],
      });
      push(MANAGE_URL.promoCode());
      toast.success("Промокод создан");
    },
    onError() {
      toast.error("Ошибка при создании");
    },
  });
};

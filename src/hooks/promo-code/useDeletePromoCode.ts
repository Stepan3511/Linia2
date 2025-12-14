import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoCodeService } from "@/services/promo-code.service";
import toast from "react-hot-toast";

export const useDeletePromoCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete promo code"],
    mutationFn: (id: string) => promoCodeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get promo codes"],
      });
      toast.success("Промокод удален");
    },
    onError() {
      toast.error("Ошибка при удалении");
    },
  });
};

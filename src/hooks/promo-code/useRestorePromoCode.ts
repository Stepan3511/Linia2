import { useMutation, useQueryClient } from "@tanstack/react-query";
import { promoCodeService } from "@/services/promo-code.service";
import toast from "react-hot-toast";

export const useRestorePromoCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promoCodeService.restoreFromArchive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get promo codes"] });
      queryClient.invalidateQueries({ queryKey: ["get archived promo codes"] });
      toast.success("Промокод восстановлен");
    },
    onError() {
      toast.error("Ошибка при восстановлении");
    },
  });
};

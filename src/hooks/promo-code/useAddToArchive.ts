import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { promoCodeService } from "@/services/promo-code.service";

export const useAddToArchive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => promoCodeService.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get promo codes"] });
      queryClient.invalidateQueries({ queryKey: ["get archived promo codes"] });
      toast.success("Промокод перемещен в архив");
    },
    onError: () => {
      toast.error("Ошибка при архивировании промокода");
    },
  });
};

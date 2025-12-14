import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productCateringService } from "@/services/product-catering.service";
import toast from "react-hot-toast";

export const useDeleteCateringProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete catering product"],
    mutationFn: (id: string) => productCateringService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get catering products"],
      });
      toast.success("Товар удален");
    },
    onError() {
      toast.error("Ошибка при удалении");
    },
  });
};

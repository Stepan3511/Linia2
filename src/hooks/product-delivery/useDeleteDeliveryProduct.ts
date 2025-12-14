import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productDeliveryService } from "@/services/product-delivery.service";
import toast from "react-hot-toast";

export const useDeleteDeliveryProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete delivery product"],
    mutationFn: (id: string) => productDeliveryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get delivery products"],
      });
      toast.success("Товар удален");
    },
    onError() {
      toast.error("Ошибка при удалении");
    },
  });
};

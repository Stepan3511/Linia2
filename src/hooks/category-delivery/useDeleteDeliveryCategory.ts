import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryDeliveryService } from "@/services/category-delivery.service";
import toast from "react-hot-toast";

export const useDeleteDeliveryCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete delivery category"],
    mutationFn: (id: string) => categoryDeliveryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get delivery categories"],
      });
      toast.success("Категория удалена");
    },
    onError() {
      toast.error("Ошибка при удалении");
    },
  });
};

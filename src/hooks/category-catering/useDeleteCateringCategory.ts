import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryCateringService } from "@/services/category-catering.service";
import toast from "react-hot-toast";

export const useDeleteCateringCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete catering category"],
    mutationFn: (id: string) => categoryCateringService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get catering categories"],
      });
      toast.success("Категория удалена");
    },
    onError() {
      toast.error("Ошибка при удалении");
    },
  });
};

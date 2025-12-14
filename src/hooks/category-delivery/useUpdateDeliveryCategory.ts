import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { ICategoryInput } from "@/types/category.types";
import { categoryDeliveryService } from "@/services/category-delivery.service";
import toast from "react-hot-toast";

export const useUpdateDeliveryCategory = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: ICategoryInput) =>
      categoryDeliveryService.update(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get delivery categories"],
      });
      push(MANAGE_URL.categoryDelivery());
      toast.success("Категория обновлена");
    },
    onError() {
      toast.error("Ошибка при обновлении");
    },
  });
};

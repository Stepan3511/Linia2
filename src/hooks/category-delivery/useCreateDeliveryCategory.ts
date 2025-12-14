import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ICategoryInput } from "@/types/category.types";
import { categoryDeliveryService } from "@/services/category-delivery.service";
import { MANAGE_URL } from "@/config/url.config";
import toast from "react-hot-toast";

export const useCreateDeliveryCategory = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: ICategoryInput) =>
      categoryDeliveryService.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get delivery categories"],
      });
      push(MANAGE_URL.categoryDelivery());
      toast.success("Категория создана");
    },
    onError() {
      toast.error("Ошибка при создании");
    },
  });
};

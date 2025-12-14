import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ICategoryInput } from "@/types/category.types";
import { categoryCateringService } from "@/services/category-catering.service";
import { MANAGE_URL } from "@/config/url.config";
import toast from "react-hot-toast";

export const useCreateCateringCategory = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: ICategoryInput) =>
      categoryCateringService.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get catering categories"],
      });
      push(MANAGE_URL.categoryCatering());
      toast.success("Категория создана");
    },
    onError() {
      toast.error("Ошибка при создании");
    },
  });
};

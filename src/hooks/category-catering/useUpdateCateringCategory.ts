import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { ICategoryInput } from "@/types/category.types";
import { categoryCateringService } from "@/services/category-catering.service";
import toast from "react-hot-toast";

export const useUpdateCateringCategory = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: ICategoryInput) =>
      categoryCateringService.update(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get catering categories"],
      });
      push(MANAGE_URL.categoryCatering());
      toast.success("Категория обновлена");
    },
    onError() {
      toast.error("Ошибка при обновлении");
    },
  });
};

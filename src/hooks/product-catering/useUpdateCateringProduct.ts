import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { IProductCateringInput } from "@/types/product-catering.types";
import { productCateringService } from "@/services/product-catering.service";
import toast from "react-hot-toast";

export const useUpdateCateringProduct = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: IProductCateringInput) =>
      productCateringService.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get catering products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get catering product", id],
      });
      toast.success("Товар обновлен");
      push(MANAGE_URL.productCatering());
    },
    onError() {
      toast.error("Ошибка при обновлении");
    },
  });
};

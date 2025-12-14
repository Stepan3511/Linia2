import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IProductCateringInput } from "@/types/product-catering.types";
import { productCateringService } from "@/services/product-catering.service";
import { MANAGE_URL } from "@/config/url.config";
import toast from "react-hot-toast";

export const useCreateCateringProduct = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: IProductCateringInput) =>
      productCateringService.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get catering products"],
      });
      push(MANAGE_URL.productCatering());
      toast.success("Товар создан");
    },
    onError() {
      toast.error("Ошибка при создании");
    },
  });
};

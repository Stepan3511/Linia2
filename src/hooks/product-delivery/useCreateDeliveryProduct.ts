import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IProductDeliveryInput } from "@/types/product-delivery.types";
import { productDeliveryService } from "@/services/product-delivery.service";
import { MANAGE_URL } from "@/config/url.config";
import toast from "react-hot-toast";

export const useCreateDeliveryProduct = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: IProductDeliveryInput) =>
      productDeliveryService.create(product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get delivery products"],
      });
      toast.success("Товар создан");
      push(MANAGE_URL.productDelivery());
    },
    onError() {
      toast.error("Ошибка при создании");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { IProductDeliveryInput } from "@/types/product-delivery.types";
import { productDeliveryService } from "@/services/product-delivery.service";
import toast from "react-hot-toast";

export const useUpdateDeliveryProduct = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: IProductDeliveryInput) =>
      productDeliveryService.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get delivery products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get delivery product", id],
      });
      push(MANAGE_URL.productDelivery());
      toast.success("Товар обновлен");
    },
    onError() {
      toast.error("Ошибка при обновлении");
    },
  });
};

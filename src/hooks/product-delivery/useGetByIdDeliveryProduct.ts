import { useQuery } from "@tanstack/react-query";
import { IProductDelivery } from "@/types/product-delivery.types";
import { productDeliveryService } from "@/services/product-delivery.service";

export const useGetByIdDeliveryProduct = (id: string) => {
  return useQuery<IProductDelivery>({
    queryKey: ["get delivery product", id],
    queryFn: async () => {
      const { data } = await productDeliveryService.getById(id);
      return data;
    },
  });
};

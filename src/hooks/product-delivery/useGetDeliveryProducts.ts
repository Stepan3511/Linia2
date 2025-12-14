import { useQuery } from "@tanstack/react-query";

import { IProductDelivery } from "@/types/product-delivery.types";
import { productDeliveryService } from "@/services/product-delivery.service";

export const useGetDeliveryProducts = () => {
  return useQuery<IProductDelivery[]>({
    queryKey: ["get delivery products"],
    queryFn: async () => {
      const { data } = await productDeliveryService.get();
      return data;
    },
  });
};

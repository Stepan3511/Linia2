import { useQuery } from "@tanstack/react-query";

import { IProductCatering } from "@/types/product-catering.types";
import { productCateringService } from "@/services/product-catering.service";

export const useGetCateringProducts = () => {
  return useQuery<IProductCatering[]>({
    queryKey: ["get catering products"],
    queryFn: async () => {
      const { data } = await productCateringService.get();
      return data;
    },
  });
};

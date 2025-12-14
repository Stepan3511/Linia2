import { useQuery } from "@tanstack/react-query";
import { IProductCatering } from "@/types/product-catering.types";
import { productCateringService } from "@/services/product-catering.service";

export const useGetByIdCateringProduct = (id: string) => {
  return useQuery<IProductCatering>({
    queryKey: ["get catering product", id],
    queryFn: async () => {
      const { data } = await productCateringService.getById(id);
      return data;
    },
  });
};

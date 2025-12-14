import { useQuery } from "@tanstack/react-query";

import { ICategory } from "@/types/category.types";
import { categoryDeliveryService } from "@/services/category-delivery.service";

export const useGetDeliveryCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["get delivery categories"],
    queryFn: async () => {
      const { data } = await categoryDeliveryService.get();
      return data;
    },
  });
};

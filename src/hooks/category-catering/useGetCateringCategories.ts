import { useQuery } from "@tanstack/react-query";

import { ICategory } from "@/types/category.types";
import { categoryCateringService } from "@/services/category-catering.service";

export const useGetCateringCategories = () => {
  return useQuery<ICategory[]>({
    queryKey: ["get catering categories"],
    queryFn: async () => {
      const { data } = await categoryCateringService.get();
      return data;
    },
  });
};

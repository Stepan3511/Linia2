import { useQuery } from "@tanstack/react-query";
import { ICategory } from "@/types/category.types";
import { categoryCateringService } from "@/services/category-catering.service";

export const useGetByIdCateringCategory = (id: string) => {
  return useQuery<ICategory>({
    queryKey: ["get catering category", id],
    queryFn: async () => {
      const { data } = await categoryCateringService.getById(id);
      return data;
    },
  });
};

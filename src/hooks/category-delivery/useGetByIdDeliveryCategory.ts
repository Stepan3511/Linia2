import { useQuery } from "@tanstack/react-query";
import { ICategory } from "@/types/category.types";
import { categoryDeliveryService } from "@/services/category-delivery.service";

export const useGetByIdDeliveryCategory = (id: string) => {
  return useQuery<ICategory>({
    queryKey: ["get delivery category", id],
    queryFn: async () => {
      const { data } = await categoryDeliveryService.getById(id);
      return data;
    },
  });
};

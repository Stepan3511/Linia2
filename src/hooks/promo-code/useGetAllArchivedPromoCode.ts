import { useQuery } from "@tanstack/react-query";
import { IPromoCode } from "@/types/promo-code.types";
import { promoCodeService } from "@/services/promo-code.service";

export const useGetAllArchivedPromoCode = () => {
  return useQuery<IPromoCode[]>({
    queryKey: ["get archived promo codes"],
    queryFn: async () => {
      const { data } = await promoCodeService.getAllArchived();
      return data;
    },
  });
};

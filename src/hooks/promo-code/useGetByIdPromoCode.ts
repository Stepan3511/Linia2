import { useQuery } from "@tanstack/react-query";
import { IPromoCode } from "@/types/promo-code.types";
import { promoCodeService } from "@/services/promo-code.service";

export const useGetByIdPromoCode = (id: string) => {
  return useQuery<IPromoCode>({
    queryKey: ["get promo code", id],
    queryFn: async () => {
      const { data } = await promoCodeService.getById(id);
      return data;
    },
  });
};

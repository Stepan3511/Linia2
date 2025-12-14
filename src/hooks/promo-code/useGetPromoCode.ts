import { useQuery } from "@tanstack/react-query";

import { IPromoCode } from "@/types/promo-code.types";
import { promoCodeService } from "@/services/promo-code.service";

export const useGetPromoCode = () => {
  return useQuery<IPromoCode[]>({
    queryKey: ["get promo codes"],
    queryFn: async () => {
      const { data } = await promoCodeService.get();
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

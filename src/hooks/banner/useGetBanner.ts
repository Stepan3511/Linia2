import { useQuery } from "@tanstack/react-query";

import { IBanner } from "@/types/banner.types";
import { bannerService } from "@/services/banner.service";

export const useGetBanner = () => {
  return useQuery<IBanner>({
    queryKey: ["get banner"],
    queryFn: async () => {
      const { data } = await bannerService.getBanner();
      return data;
    },
  });
};

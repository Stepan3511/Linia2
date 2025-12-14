import { useQuery } from "@tanstack/react-query";

import { IWorkTime } from "@/types/work-time.types";
import { workTimeService } from "@/services/work-time.service";

export const useGetWorkTime = () => {
  return useQuery<IWorkTime[]>({
    queryKey: ["get work times"],
    queryFn: async () => {
      const { data } = await workTimeService.get();
      return data;
    },
  });
};

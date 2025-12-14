import { useQuery } from "@tanstack/react-query";

import { IHolidayTime } from "@/types/holiday-time.types";
import { holidayTimeService } from "@/services/holiday-time.service";

export const useGetHolidayTime = () => {
  return useQuery<IHolidayTime[]>({
    queryKey: ["get holiday times"],
    queryFn: async () => {
      const { data } = await holidayTimeService.get();
      return data;
    },
  });
};

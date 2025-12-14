import { useQuery } from "@tanstack/react-query";
import { IHolidayTime } from "@/types/holiday-time.types";
import { holidayTimeService } from "@/services/holiday-time.service";

export const useGetByIdHolidayTime = (id: string) => {
  return useQuery<IHolidayTime>({
    queryKey: ["get holiday time", id],
    queryFn: async () => {
      const { data } = await holidayTimeService.getById(id);
      return data;
    },
  });
};

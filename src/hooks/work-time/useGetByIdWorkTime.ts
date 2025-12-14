import { useQuery } from "@tanstack/react-query";
import { IWorkTime } from "@/types/work-time.types";
import { workTimeService } from "@/services/work-time.service";

export const useGetByIdWorkTime = (id: string) => {
  return useQuery<IWorkTime>({
    queryKey: ["get work time", id],
    queryFn: async () => {
      const { data } = await workTimeService.getById(id);
      return data;
    },
  });
};

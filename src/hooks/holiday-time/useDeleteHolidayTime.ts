import { useMutation, useQueryClient } from "@tanstack/react-query";
import { holidayTimeService } from "@/services/holiday-time.service";
import toast from "react-hot-toast";

export const useDeleteHolidayTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete holiday time"],
    mutationFn: (id: string) => holidayTimeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get holiday times"],
      });
      toast.success("Выходные удалены");
    },
    onError() {
      toast.error("Ошибка при удалении");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workTimeService } from "@/services/work-time.service";
import toast from "react-hot-toast";

export const useDeleteWorkTime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete work time"],
    mutationFn: (id: string) => workTimeService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get work times"],
      });
      toast.success("Расписание удалено");
    },
    onError() {
      toast.error("Ошибка при удалении");
    },
  });
};

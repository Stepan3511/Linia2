import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { IWorkTimeInput } from "@/types/work-time.types";
import { workTimeService } from "@/services/work-time.service";
import toast from "react-hot-toast";

export const useUpdateWorkTime = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workTime: IWorkTimeInput) =>
      workTimeService.update(id, workTime),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get work times"],
      });
      push(MANAGE_URL.workTime());
      toast.success("Расписание обновлено");
    },
    onError() {
      toast.error("Ошибка при обновлении");
    },
  });
};

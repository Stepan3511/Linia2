import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IWorkTimeInput } from "@/types/work-time.types";
import { workTimeService } from "@/services/work-time.service";
import { MANAGE_URL } from "@/config/url.config";
import toast from "react-hot-toast";

export const useCreateWorkTime = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workTime: IWorkTimeInput) => workTimeService.create(workTime),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get work times"],
      });
      push(MANAGE_URL.workTime());
      toast.success("Расписание создано");
    },
    onError() {
      toast.error("Ошибка при создании");
    },
  });
};

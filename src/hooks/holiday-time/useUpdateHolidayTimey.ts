import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { IHolidayTimeInput } from "@/types/holiday-time.types";
import { holidayTimeService } from "@/services/holiday-time.service";
import toast from "react-hot-toast";

export const useUpdateHolidayTime = (id: string) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (holidayTime: IHolidayTimeInput) =>
      holidayTimeService.update(id, holidayTime),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get holiday times"],
      });
      push(MANAGE_URL.holidayTime());
      toast.success("Выходные обновлены");
    },
    onError() {
      toast.error("Ошибка при обновлении");
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IHolidayTimeInput } from "@/types/holiday-time.types";
import { holidayTimeService } from "@/services/holiday-time.service";
import { MANAGE_URL } from "@/config/url.config";
import toast from "react-hot-toast";

export const useCreateHolidayTime = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (holidayTime: IHolidayTimeInput) =>
      holidayTimeService.create(holidayTime),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get holiday times"],
      });
      push(MANAGE_URL.holidayTime());
      toast.success("Выходные созданы");
    },
    onError() {
      toast.error("Ошибка при создании");
    },
  });
};

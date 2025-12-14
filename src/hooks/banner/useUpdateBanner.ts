import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MANAGE_URL } from "@/config/url.config";
import { useRouter } from "next/navigation";
import { IBannerInput } from "@/types/banner.types";
import { bannerService } from "@/services/banner.service";
import toast from "react-hot-toast";

export const useUpdateBanner = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IBannerInput) => bannerService.updateBanner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get banner"],
      });
      push(MANAGE_URL.banner());
      toast.success("Баннер обновлен");
    },
    onError() {
      toast.error("Ошибка при обновлении баннера");
    },
  });
};

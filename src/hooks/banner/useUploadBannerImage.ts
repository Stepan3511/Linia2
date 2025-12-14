import { useMutation } from "@tanstack/react-query";
import { bannerService } from "@/services/banner.service";
import toast from "react-hot-toast";

export const useUploadBannerImage = (
  onSuccess?: (imageUrl: string) => void
) => {
  return useMutation({
    mutationFn: (data: FormData) => bannerService.uploadImage(data),
    onSuccess: ({ data }) => {
      toast.success("Изображение успешно загружено");
      if (onSuccess) onSuccess(data.imageUrl);
    },
    onError() {
      toast.error("Ошибка при загрузке изображения");
    },
  });
};

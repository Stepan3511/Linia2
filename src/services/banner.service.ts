import { API_URL } from "@/config/api.config";
import { IBanner, IBannerInput } from "@/types/banner.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class BannerService {
  /**
   * Получение баннера (в системе только один баннер)
   */
  async getBanner() {
    return axiosClassic.get<IBanner>(API_URL.banner());
  }

  /**
   * Обновление баннера
   * @param data - данные для обновления баннера
   */
  async updateBanner(data: IBannerInput) {
    return axiosWithAuth.patch<string>(API_URL.banner(), data);
  }

  /**
   * Загрузка изображения для баннера
   * @param file - файл изображения
   */
  async uploadImage(file: FormData) {
    return axiosWithAuth.post<{ imageUrl: string }>(API_URL.banner('/upload-image'), file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const bannerService = new BannerService();

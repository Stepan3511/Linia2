import { API_URL } from "@/config/api.config";
import { IPromoCode, IPromoCodeInput } from "@/types/promo-code.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class PromoCodeService {
  async get() {
    return axiosClassic.get<IPromoCode[]>(API_URL.promoCode(), {
      params: { includeProducts: true },
    });
  }

  async getById(id: string) {
    return axiosClassic.get<IPromoCode>(API_URL.promoCode(`/by-id/${id}`));
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.promoCode(`/${id}`));
  }

  async create(data: IPromoCodeInput) {
    return axiosWithAuth.post<string>(API_URL.promoCode(), data);
  }

  async update(id: string, data: IPromoCodeInput) {
    return axiosWithAuth.patch<string>(API_URL.promoCode(`/${id}`), data);
  }

  async archive(id: string) {
    return axiosWithAuth.patch<string>(API_URL.promoCode(`/archive/${id}`));
  }

  async getAllArchived() {
    return axiosWithAuth.get<IPromoCode[]>(API_URL.promoCode("/archived"));
  }

  async restoreFromArchive(id: string) {
    return axiosWithAuth.post(API_URL.promoCode(`/${id}/restore`));
  }
}

export const promoCodeService = new PromoCodeService();

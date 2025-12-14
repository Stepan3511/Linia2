import { API_URL } from "@/config/api.config";
import {
  IProductCatering,
  IProductCateringInput,
} from "@/types/product-catering.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class ProductCateringService {
  async get() {
    return axiosClassic.get<IProductCatering[]>(API_URL.productCatering());
  }

  async getById(id: string) {
    return axiosClassic.get<IProductCatering>(
      API_URL.productCatering(`/by-id/${id}`)
    );
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.productCatering(`/${id}`));
  }

  async create(data: IProductCateringInput) {
    return axiosWithAuth.post<string>(API_URL.productCatering(), data);
  }

  async update(id: string, data: IProductCateringInput) {
    return axiosWithAuth.patch<string>(API_URL.productCatering(`/${id}`), data);
  }
}

export const productCateringService = new ProductCateringService();

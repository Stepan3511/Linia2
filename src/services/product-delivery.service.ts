import { API_URL } from "@/config/api.config";
import {
  IProductDelivery,
  IProductDeliveryInput,
} from "@/types/product-delivery.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class ProductDeliveryService {
  async get() {
    return axiosClassic.get<IProductDelivery[]>(API_URL.productDelivery());
  }

  async getById(id: string) {
    return axiosClassic.get<IProductDelivery>(
      API_URL.productDelivery(`/by-id/${id}`)
    );
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.productDelivery(`/${id}`));
  }

  async create(data: IProductDeliveryInput) {
    return axiosWithAuth.post<string>(API_URL.productDelivery(), data);
  }

  async update(id: string, data: IProductDeliveryInput) {
    return axiosWithAuth.patch<string>(API_URL.productDelivery(`/${id}`), data);
  }
}

export const productDeliveryService = new ProductDeliveryService();

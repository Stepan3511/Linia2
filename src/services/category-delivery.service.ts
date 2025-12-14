import { API_URL } from "@/config/api.config";
import { ICategory, ICategoryInput } from "@/types/category.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class CategoryDeliveryService {
  async get() {
    return axiosClassic.get<ICategory[]>(API_URL.categoryDelivery());
  }

  async getById(id: string) {
    return axiosClassic.get<ICategory>(
      API_URL.categoryDelivery(`/by-id/${id}`)
    );
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.categoryDelivery(`/${id}`));
  }

  async create(data: ICategoryInput) {
    return axiosWithAuth.post<string>(API_URL.categoryDelivery(), data);
  }

  async update(id: string, data: ICategoryInput) {
    return axiosWithAuth.patch<string>(
      API_URL.categoryDelivery(`/${id}`),
      data
    );
  }
}

export const categoryDeliveryService = new CategoryDeliveryService();

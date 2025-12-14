import { API_URL } from "@/config/api.config";
import { ICategory, ICategoryInput } from "@/types/category.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class CategoryCateringService {
  async get() {
    return axiosClassic.get<ICategory[]>(API_URL.categoryCatering());
  }

  async getById(id: string) {
    return axiosClassic.get<ICategory>(
      API_URL.categoryCatering(`/by-id/${id}`)
    );
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.categoryCatering(`/${id}`));
  }

  async create(data: ICategoryInput) {
    return axiosWithAuth.post<string>(API_URL.categoryCatering(), data);
  }

  async update(id: string, data: ICategoryInput) {
    return axiosWithAuth.patch<string>(
      API_URL.categoryCatering(`/${id}`),
      data
    );
  }
}

export const categoryCateringService = new CategoryCateringService();

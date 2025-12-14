import { axiosWithAuthClient } from "@/api/interceptors-client";
import { API_URL } from "@/config/api.config";
import { ICreateOrderInput, IOrder } from "@/types/order.types";
class OrderService {
  async create(data: ICreateOrderInput) {
    return axiosWithAuthClient.post<IOrder>(API_URL.order(), data);
  }

  async getHistory(): Promise<IOrder[]> {
    const response = await axiosWithAuthClient.get<IOrder[]>(
      API_URL.order("/history")
    );
    return response.data;
  }
}

export const orderService = new OrderService();

import { API_URL } from "@/config/api.config";
import { IHolidayTime, IHolidayTimeInput } from "@/types/holiday-time.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class HolidayTimeService {
  async get() {
    return axiosClassic.get<IHolidayTime[]>(API_URL.holidayTime());
  }

  async getById(id: string) {
    return axiosClassic.get<IHolidayTime>(API_URL.holidayTime(`/by-id/${id}`));
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.holidayTime(`/${id}`));
  }

  async create(data: IHolidayTimeInput) {
    return axiosWithAuth.post<string>(API_URL.holidayTime(), data);
  }

  async update(id: string, data: IHolidayTimeInput) {
    return axiosWithAuth.patch<string>(API_URL.holidayTime(`/${id}`), data);
  }
}

export const holidayTimeService = new HolidayTimeService();

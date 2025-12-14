import { API_URL } from "@/config/api.config";
import { IWorkTime, IWorkTimeInput } from "@/types/work-time.types";
import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

class WorkTimeService {
  async get() {
    return axiosClassic.get<IWorkTime[]>(API_URL.workTime());
  }

  async getById(id: string) {
    return axiosClassic.get<IWorkTime>(API_URL.workTime(`/by-id/${id}`));
  }

  async delete(id: string) {
    return axiosWithAuth.delete<string>(API_URL.workTime(`/${id}`));
  }

  async create(data: IWorkTimeInput) {
    return axiosWithAuth.post<string>(API_URL.workTime(), data);
  }

  async update(id: string, data: IWorkTimeInput) {
    return axiosWithAuth.patch<string>(API_URL.workTime(`/${id}`), data);
  }
}

export const workTimeService = new WorkTimeService();

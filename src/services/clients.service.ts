import { API_URL } from "@/config/api.config";
import { IClients } from "@/types/clients.types";
import { axiosWithAuth } from "@/api/interceptors";

class ClientsService {
  async get() {
    return axiosWithAuth.get<IClients[]>(API_URL.clients("/all-users/"));
  }
}

export const clientsService = new ClientsService();

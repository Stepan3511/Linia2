import { useQuery } from "@tanstack/react-query";

import { IClients } from "@/types/clients.types";
import { clientsService } from "@/services/clients.service";

export const useGetClients = () => {
  return useQuery<IClients[]>({
    queryKey: ["get clients"],
    queryFn: async () => {
      const { data } = await clientsService.get();
      return data;
    },
  });
};

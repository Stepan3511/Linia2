import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/order/order.service";

export const useGetOrderHistory = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order history"],
    queryFn: () => orderService.getHistory(),
  });

  return { orders, isLoading, error };
};
